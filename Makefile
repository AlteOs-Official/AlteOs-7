CC ?= gcc
LD ?= ld
CFLAGS := -std=gnu11 -O2 -Wall -Wextra -Werror -ffreestanding -fno-stack-protector -fno-pic -fno-pie -m64 -mno-red-zone -mcmodel=kernel -Iinclude
LDFLAGS := -m elf_x86_64 -nostdlib -z max-page-size=0x1000 -T kernel/linker.ld
BUILD := build
KERNEL := $(BUILD)/alteous7.elf

.PHONY: all kernel iso check verify clean
all: kernel

$(BUILD):
	mkdir -p $(BUILD)

$(BUILD)/main.o: kernel/main.c include/limine.h | $(BUILD)
	$(CC) $(CFLAGS) -c $< -o $@

$(KERNEL): $(BUILD)/main.o kernel/linker.ld
	$(LD) $(LDFLAGS) $(BUILD)/main.o -o $@

kernel: $(KERNEL)
	@echo "Kernel built: $(KERNEL)"

check:
	python3 scripts/check_project.py

verify: kernel
	sh scripts/verify_elf.sh $(KERNEL)

iso: kernel
	@test -f boot/limine/limine-bios.sys || (echo "Missing boot/limine/limine-bios.sys; install Limine boot files first." && exit 1)
	@test -f boot/limine/limine-bios-cd.bin || (echo "Missing boot/limine/limine-bios-cd.bin; install Limine boot files first." && exit 1)
	@test -f boot/limine/limine-uefi-cd.bin || (echo "Missing boot/limine/limine-uefi-cd.bin; install Limine boot files first." && exit 1)
	@command -v xorriso >/dev/null || (echo "Missing xorriso." && exit 1)
	mkdir -p $(BUILD)/iso/boot/limine
	cp $(KERNEL) $(BUILD)/iso/boot/alteous7.elf
	cp limine.conf $(BUILD)/iso/limine.conf
	cp boot/limine/limine-bios.sys boot/limine/limine-bios-cd.bin boot/limine/limine-uefi-cd.bin $(BUILD)/iso/boot/limine/
	xorriso -as mkisofs -R -r -J -b boot/limine/limine-bios-cd.bin -no-emul-boot -boot-load-size 4 -boot-info-table --efi-boot boot/limine/limine-uefi-cd.bin -efi-boot-part --efi-boot-image --protective-msdos-label $(BUILD)/iso -o $(BUILD)/alteous7.iso
	@echo "ISO created: $(BUILD)/alteous7.iso"

clean:
	rm -rf $(BUILD)
