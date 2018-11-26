
## git 提交时，不提交某些文件：
git status,复制不需要提交的文件路径，
git add . 
git reset 不需要提交的文件路径（可保留对此文件做的更改）
git commit -m""
git push

## git checkout文件路径 将还原文件，不会保留当前做的任何更改

git pull --rebase
git add filename
git rebase --continue
如果想取消本次rebase: git rebase --abort


## 拉取本地不存在的远端分支
git checkout -b xxx origin/xxx

## git cherry-pick
git checkout到目标分支
git cherry-pick [old-commit-id]
{如果有conflict git commit -a}
git push

## 切换到本地已存在分支
git checkout [分支名]

## 在日志目录动态查看日志（C盘temp) git bash或cmd
tail -f mbpgc_u.20181107.log



