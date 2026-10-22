# Architecture and implementation boundaries

1. Boot protocol: Limine hands control to the x86-64 kernel.
2. Kernel core: future exceptions/interrupts, memory, scheduler, IPC and syscalls.
3. Drivers: framebuffer, serial, timer, keyboard, storage, USB, network and audio.
4. System services: VFS, process services, configuration, logging, package operations and networking.
5. Display stack: compositor/window manager, input routing and rendering.
6. Userland: shell, terminal, Files, Settings, Task Manager and utilities.
7. Compatibility: native ABI first; later PE/Win32 compatibility as a long-term project.
8. Distribution: installer, hardware compatibility reporting, signed updates and edition profiles.

The current kernel only writes serial diagnostics, attempts a framebuffer clear and halts. It does not implement userspace, a filesystem, device discovery, syscalls or a desktop. Third-party bootloader files are not bundled.
