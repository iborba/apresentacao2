#!/usr/bin/env bash
ssh -i /src/mpn-libs-ssh-key \
  -o UserKnownHostsFile=/dev/null \
  -o StrictHostKeyChecking=no \
  $*