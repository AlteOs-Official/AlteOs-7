#ifndef ALTEOS_LIMINE_H
#define ALTEOS_LIMINE_H
#include <stdint.h>
#include <stddef.h>
#define LIMINE_COMMON_MAGIC_0 0xc7b1dd30df4c8b88
#define LIMINE_COMMON_MAGIC_1 0x0a82e883a194f07b
#define LIMINE_BASE_REVISION(N) volatile uint64_t limine_base_revision[3] __attribute__((used, section(".limine_requests"))) = { LIMINE_COMMON_MAGIC_0, LIMINE_COMMON_MAGIC_1, (N) }
#define LIMINE_BASE_REVISION_SUPPORTED (limine_base_revision[2] == 0)
#define LIMINE_REQUESTS_START_MARKER static uint64_t limine_requests_start_marker[4] __attribute__((used, section(".limine_requests_start"))) = { 0xf6b8f4b39de7d1ae, 0xfab91a6940fcb9cf, 0x785c6ed015d3e316, 0x181e920a7852b9d9 }
#define LIMINE_REQUESTS_END_MARKER static uint64_t limine_requests_end_marker[2] __attribute__((used, section(".limine_requests_end"))) = { 0xadc0e0531bb10d03, 0x9572709f31764c62 }
#define LIMINE_FRAMEBUFFER_REQUEST_ID { 0x9d5827dcd881dd75, 0xa3148604f6fab11b, 0x1e7e9c0e8d5e5a9b, 0x0a4f6f8d5b9c2a11 }
struct limine_framebuffer;
struct limine_framebuffer_response { uint64_t revision; uint64_t framebuffer_count; struct limine_framebuffer **framebuffers; };
struct limine_framebuffer_request { uint64_t id[4]; uint64_t revision; struct limine_framebuffer_response *response; };
struct limine_framebuffer {
    void *address; uint64_t width; uint64_t height; uint64_t pitch; uint16_t bits_per_pixel;
    uint8_t memory_model; uint8_t red_mask_size, red_mask_shift; uint8_t green_mask_size, green_mask_shift;
    uint8_t blue_mask_size, blue_mask_shift; uint8_t reserved_mask_size, reserved_mask_shift;
    uint8_t *edid; uint64_t edid_size;
};
#endif
