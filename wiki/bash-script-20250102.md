---
layout: layouts/wiki.njk
title: Bash Script
date: 2025-01-03T02:18:00.000Z
---
## variable

syntax: `<variable-name>=<value>`
For variables to work you cannot leave a space between the variable name, the ”=” and the value. They cannot have spaces in.
After decalring you can use the variable anywhere in the script using a `$` followed by the variable name.

```bash
#!/bin/bash

name="Jammy"

echo $name

//output: Jammy
```

## Debugging

Bash script can be directly debugged by running using:

```bash
bash -x file.sh
```

also `set -x` and `set +x` can also be used to debug bash script

```bash
set -x
# This part will be debugged
set +x
```

## Parameters

Parmeters can be read using `$1`, `$2`, ...

```bash
name=$1

echo $name
```

If we want to read user input on runtime, `read` command can do the work

```
#!/bin/bash

echo "Enter name: "
read name

echo $name
```

Some of the intersting variables are:

```bash
$0 # name of the script executed
$# # Number of arguements passed down to script
```
