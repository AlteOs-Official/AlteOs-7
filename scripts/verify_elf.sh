#!/usr/bin/env sh
set -eu
ELF="${1:-build/alteous7.elf}"
[ -f "$ELF" ] || { echo "ELF not found: $ELF" >&2; exit 1; }
file "$ELF"
readelf -h "$ELF" | grep -q 'Class:.*ELF64' || { echo 'Expected ELF64.' >&2; exit 1; }
readelf -h "$ELF" | grep -q 'Machine:.*Advanced Micro Devices X86-64' || { echo 'Expected x86-64 ELF.' >&2; exit 1; }
readelf -h "$ELF" | grep -q 'Type:.*EXEC' || { echo 'Expected executable ELF.' >&2; exit 1; }
echo "ELF format checks passed: $ELF"
