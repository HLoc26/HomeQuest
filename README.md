### **1. Clone RepoA Without History (as a Fresh Start)**  
Since you want **ProjectB** to be independent of RepoA’s history, use:  
```sh
git clone --depth=1 --branch main https://github.com/HLoc26/express-template.git my-project
cd my-project
rm -rf .git  # Remove git history
```
> 🚀 This removes the commit history, making **ProjectB** a fresh project.

---

### **2. Initialize a New Git Repository**  
```sh
git init
git branch -M main
git add .
git commit -m "Initial commit from RepoA template"
```

---

### **3. Connect to a New Remote (ProjectB Repo)**
```sh
git remote add origin <my-project-url>
git push -u origin main
```
> 🔗 Replace `<my-project-url>` with the new repository’s URL.
