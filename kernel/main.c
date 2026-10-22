#include <stdint.h>
#include <stddef.h>
#include "limine.h"

LIMINE_BASE_REVISION(3);
LIMINE_REQUESTS_START_MARKER;

__attribute__((used, section(".limine_requests")))
static volatile struct limine_framebuffer_request framebuffer_request = {
    .id = LIMINE_FRAMEBUFFER_REQUEST_ID,
    .revision = 0,
    .response = NULL
};

LIMINE_REQUESTS_END_MARKER;

static inline void outb(uint16_t port, uint8_t value) {
    __asm__ volatile ("outb %0, %1" : : "a"(value), "Nd"(port));
}
static inline uint8_t inb(uint16_t port) {
    uint8_t ret;
    __asm__ volatile ("inb %1, %0" : "=a"(ret) : "Nd"(port));
    return ret;
}
static void serial_init(void) {
    outb(0x3F8 + 1, 0x00); outb(0x3F8 + 3, 0x80);
    outb(0x3F8 + 0, 0x03); outb(0x3F8 + 1, 0x00);
    outb(0x3F8 + 3, 0x03); outb(0x3F8 + 2, 0xC7);
    outb(0x3F8 + 4, 0x0B);
}
static void serial_putc(char c) {
    while ((inb(0x3F8 + 5) & 0x20) == 0) { }
    outb(0x3F8, (uint8_t)c);
}
static void serial_write(const char *s) { while (*s) serial_putc(*s++); }
static void halt_forever(void) { for (;;) __asm__ volatile ("cli; hlt"); }

static void framebuffer_clear(uint32_t color) {
    if (!framebuffer_request.response ||
        framebuffer_request.response->framebuffer_count == 0) return;
    struct limine_framebuffer *fb = framebuffer_request.response->framebuffers[0];
    if (!fb || !fb->address || fb->bits_per_pixel != 32) return;
    for (uint64_t y = 0; y < fb->height; y++) {
        volatile uint32_t *row = (volatile uint32_t *)((uint8_t *)fb->address + y * fb->pitch);
        for (uint64_t x = 0; x < fb->width; x++) row[x] = color;
    }
}

void kmain(void) {
    serial_init();
    serial_write("\r\nAlteOS 7 kernel: boot entry reached.\r\n");
    serial_write("Milestone: freestanding kernel entry + serial diagnostics.\r\n");
    serial_write("This is development software, not a daily-use operating system.\r\n");
    if (LIMINE_BASE_REVISION_SUPPORTED) {
        serial_write("Limine base revision: supported.\r\n");
    } else {
        serial_write("WARNING: requested Limine base revision is not supported.\r\n");
    }
    framebuffer_clear(0x0010192b);
    serial_write("Framebuffer clear attempted if a 32-bpp framebuffer is available.\r\n");
    serial_write("Kernel idle loop entered.\r\n");
    halt_forever();
}
