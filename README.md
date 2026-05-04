# Hackathon
## Git Workflow

- main branch дээр шууд ажиллахгүй.
- develop branch дээр feature-үүдийг нэгтгэнэ.
- Хүн бүр өөрийн feature branch дээр ажиллана.
- Branch нэр: feature/task-name эсвэл fix/error-name
- Pull Request заавал үүсгэнэ.
- Нэг PR-ийг дор хаяж 1 хүн review хийсний дараа merge хийнэ.
- Merge хийхдээ Squash and merge ашиглана.

## Daily Commands

```bash
git checkout develop
git pull origin develop
git checkout feature/your-branch
git merge develop
