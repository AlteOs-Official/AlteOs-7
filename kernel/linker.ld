OUTPUT_FORMAT(elf64-x86-64)
ENTRY(kmain)
SECTIONS {
    . = 0xffffffff80000000;
    .limine_requests : ALIGN(8) {
        KEEP(*(.limine_requests_start))
        KEEP(*(.limine_requests))
        KEEP(*(.limine_requests_end))
    }
    .text : ALIGN(4K) { *(.text .text.*) }
    .rodata : ALIGN(4K) { *(.rodata .rodata.*) }
    .data : ALIGN(4K) { *(.data .data.*) }
    .bss : ALIGN(4K) { *(COMMON) *(.bss .bss.*) }
    /DISCARD/ : { *(.eh_frame .note .comment) }
}
