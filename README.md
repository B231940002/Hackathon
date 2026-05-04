# Hackathon

Энэхүү repository нь манай багийн Hackathon project-д зориулагдсан.  
Project-ийн хөгжүүлэлтийг GitHub branch workflow ашиглан зохион байгуулна.

---

## Branch Structure

```text
main
 └── develop
      ├── feature/frontend-ui
      ├── feature/backend-api
      └── feature/core-feature
Branch Roles
Branch	Үүрэг
main	Эцсийн тогтвортой хувилбар
develop	Feature-үүдийг нэгтгэж шалгах branch
feature/frontend-ui	Frontend UI хөгжүүлэлт
feature/backend-api	Backend API хөгжүүлэлт
feature/core-feature	Үндсэн функц, integration, testing
Git Workflow Rules
main branch дээр шууд ажиллахгүй.
develop branch дээр шууд ажиллахгүй.
Хүн бүр өөрийн хариуцсан feature/... branch дээр ажиллана.
Pull Request заавал үүсгэнэ.
Pull Request-ийн base branch заавал develop байна.
Feature branch-ууд эхлээд develop руу merge хийгдэнэ.
Project бүрэн ажиллаж, demo хийхэд бэлэн болсон үед л develop branch-ийг main руу merge хийнэ.
Merge хийхдээ боломжтой бол Squash and merge ашиглана.
Нэг файлыг олон хүн зэрэг засахгүй.
Daily Commands

Ажил эхлэх бүртээ:

git checkout develop
git pull origin develop
git checkout feature/your-branch
git merge develop

Жишээ:

git checkout develop
git pull origin develop
git checkout feature/frontend-ui
git merge develop
Commit and Push

Кодоо бичсэний дараа:

git status
git add .
git commit -m "Write clear commit message"
git push

Хэрэв branch-аа анх удаа GitHub руу push хийж байгаа бол:

git push -u origin feature/your-branch

Жишээ:

git push -u origin feature/frontend-ui
Pull Request Rule

Зөв Pull Request:

feature/frontend-ui → develop
feature/backend-api → develop
feature/core-feature → develop

Буруу Pull Request:

feature/frontend-ui → main
feature/backend-api → main
feature/core-feature → main

Final үед:

develop → main
Team Work Division
Үүрэг	Branch	Хийх ажил
Frontend team	feature/frontend-ui	React UI, pages, components, responsive design
Backend team	feature/backend-api	Server, API routes, database, validation
Core/Integration team	feature/core-feature	Frontend-backend холболт, testing, demo бэлтгэл
Folder Structure
Hackathon/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── server.js
│
├── README.md
└── .gitignore
Frontend ажиллуулах
cd frontend
npm install
npm start

эсвэл Vite ашиглаж байгаа бол:

cd frontend
npm install
npm run dev
Backend ажиллуулах
cd backend
npm install
npm start

эсвэл:

npm run dev
Important Rules
node_modules/ commit хийхгүй.
.DS_Store commit хийхгүй.
Хэрэггүй file/folder commit хийхгүй.
Commit message тодорхой бичнэ.
Pull Request хийхээс өмнө project ажиллаж байгаа эсэхийг шалгана.
Conflict гарвал тухайн файл дээр ажилласан хүмүүстэй ярилцаж шийднэ.
main branch дээр зөвхөн final stable version байна.
Useful Git Commands
# branch харах
git branch

# бүх branch харах
git branch -a

# GitHub дээрх шинэ мэдээлэл татах
git fetch origin

# branch солих
git checkout branch-name

# шинэ branch үүсгээд орох
git checkout -b feature/name

# status шалгах
git status

# өөрчлөлт add хийх
git add .

# бүх өөрчлөлт, устгалт add хийх
git add -A

# commit хийх
git commit -m "message"

# push хийх
git push

# branch анх удаа push хийх
git push -u origin branch-name

# develop дээрх шинэчлэлтийг өөрийн branch руу оруулах
git merge develop
Good Commit Message Examples
git commit -m "Create React frontend app"
git commit -m "Add backend health API"
git commit -m "Create homepage layout"
git commit -m "Fix navbar responsive design"
git commit -m "Connect frontend to backend API"

Муу commit message:

git commit -m "done"
git commit -m "final"
git commit -m "aaa"
git commit -m "update"
Project Goal

Энэхүү project-ийн зорилго нь Hackathon тэмцээний хүрээнд богино хугацаанд ажилладаг prototype систем хөгжүүлэх юм.

Үндсэн зорилтууд:

Хэрэглэгчид ойлгомжтой UI бүтээх
Backend API хөгжүүлэх
Frontend болон backend-ийг холбох
Гол feature-ийг ажиллуулах
Demo хийхэд бэлэн final version гаргах
