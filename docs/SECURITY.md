# Security baseline

- Treat device, file, package and network input as untrusted.
- Isolate user-mode code from the kernel when userland is introduced.
- Do not run downloaded applications as privileged by default.
- Require cryptographic verification before claiming package/update authenticity.
- Keep hardware scans local by default; request consent for optional uploads.
- Require explicit confirmation before future disk-writing installer operations.
- Do not store payment secrets or pretend license activation exists.
- Document and test each implemented security control.
