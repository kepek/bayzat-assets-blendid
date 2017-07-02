# Assets [![Travis CI](https://travis-ci.org/kepek/bayzat-assets-blendid.svg?branch=master)](https://travis-ci.org/kepek/bayzat-assets-blendid/)

#### Usage:

```bash
node bin/assets [options] [command]
```

#### Commands:

```
build|b [assetName]    build one or more assets
clean [assetName]      clean your environment
create|c [assetName]   create one or more assets
delete|d [assetName]   delete one or more assets
install|i [assetName]  install dependencies in one or more assets
lint [assetName]       lint one or more assets
list|l                 list assets
help [cmd]             display help for [cmd]
```

#### Options:
```
-h, --help     output usage information
-V, --version  output the version number
```

## Build

```bash
node bin/assets build [assetName]
```
```bash
node bin/assets build --all
```

##### Options:
```
-h, --help     output usage information
-a, --all      build all assets
-v, --verbose  more descriptive output
```

## Clean

```bash
node bin/assets clean [assetName]
```
```bash
node bin/assets clean --all
```

##### Options:
```
-h, --help     output usage information
-a, --all      clean all assets
-v, --verbose  more descriptive output
```

## Create

```bash
node bin/assets create [assetName]
```

##### Options:
```
-h, --help      output usage information
-o, --override  full path (will create intermediate dirs if necessary)
-v, --verbose   more descriptive output
```

## Delete

```bash
node bin/assets delete [assetName]
```
```bash
node bin/assets delete --all
```

##### Options:
```
-h, --help     output usage information
-a, --all      delete all assets
-v, --verbose  more descriptive output
```

## Install

```bash
node bin/assets install [assetName]
```
```bash
node bin/assets install --all
```

##### Options:
```
-h, --help     output usage information
-a, --all      install all assets
-v, --verbose  more descriptive output
```

## Lint

```bash
node bin/assets lint [assetName]
```
```bash
node bin/assets lint --all
```

##### Options:
```
-h, --help        output usage information
-a, --all         lint all assets
-v, --verbose     more descriptive output
-f, --fix [bool]  automatically fix problems [true]
```

## List

```bash
node bin/assets list
```

##### Options:
```
-h, --help        output usage information
-v, --verbose     more descriptive output
```

## Help

```bash
node bin/assets help [cmd]
```

Copyright (c) 2017, Michal Kechner

## ఠ ͟ಠ Pull requests are welcome, naturally

![](http://i.imgur.com/Ikzywtp.gif)

----

Made with ♥ at [Bayzat](http://bayzat.com)!
