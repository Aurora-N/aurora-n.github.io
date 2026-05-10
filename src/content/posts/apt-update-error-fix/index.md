---
title: 记apt-get update报错的解决方法
published: 2023-09-22 16:31:00
category: 小记
tags: ["Ubuntu", "Steam"]
---

## 解决问题

今天想安装新软件，输入``sudo apt-get update``时，遇到了以下报错，导致无法通过apt安装软件：

<!--more-->

```shell
E: Conflicting values set for option Signed-By regarding source https://repo.steampowered.com/steam/ stable: /usr/share/keyrings/steam.gpg !=
E: The list of sources could not be read.
```

尝试``sudo apt remove steam``无果，仍然显示上面的错误，打开Synaptic Package Manager，也显示相同的错误。

```shell
cd /usr/share/keyrings
ls
```

发现并没有``steam.gpg``

直到看到了stackoverflow上的[这篇](https://stackoverflow.com/questions/71553340/sudo-apt-get-update-does-not-work-after-trying-to-install-elasticsearch-throug)帖子。

通过输入``sudo rm /etc/apt/sources.list.d/steam*``解决问题，apt得以正常使用，Steam也可以启动。

## 重装Steam

推测是前几天通过官方的[steam-installer](https://store.steampowered.com/about/)安装Steam导致的错误，决定通过apt重装Steam。

启动终端，输入：

```shell
sudo apt-get purge steam steam-launcher
```

删除与Steam相关联的目录：

```shell
sudo rm -rf ~/.local/share/steam
sudo rm -rf ~/.steam
sudo rm ~/.steampath
sudo rm ~/.steamid
sudo rm -rf Steam
```
最后重装Steam：
```shell
sudo apt install steam
```

最后在终端中输入``Steam``启动Steam。

参考：

- ['sudo apt-get update' does not work after trying to install elasticsearch through apt-get](https://stackoverflow.com/questions/71553340/sudo-apt-get-update-does-not-work-after-trying-to-install-elasticsearch-throug)

- [如何从 Ubuntu 完全卸载 Steam](https://cn.linux-console.net/?p=15965#gsc.tab=0)
