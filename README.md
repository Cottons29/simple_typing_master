# I3_typing_master
!3 Typing master (Midterm)

## 🔧 Available Scripts
- `npm run start` - Start development server
- `npm run build` - Build for production
- `npm run dev` - Development mode (if configured)

## 📝 Git Workflow

### Making Changes and Committing

1. **Check current status:**
   ```bash
   git status
   ```

2. **Add files to staging area:**
   ```bash
   # Add specific files
   git add filename.js
   
   # Add all changes
   git add .
   ```

3. **Commit your changes:**
   ```bash
   git commit -m "Add descriptive commit message"
   ```

### Pushing Changes

1. **Push to the main branch:**
   ```bash
   git push origin main
   ```

2. **Push to a specific branch:**
   ```bash
   git push origin your-branch-name
   ```

### Working with Branches

1. **Create a new branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Switch between branches:**
   ```bash
   git checkout branch-name
   ```

3. **List all branches:**
   ```bash
   git branch
   ```

### Best Practices for Commits

- Use clear, descriptive commit messages
- Make small, focused commits
- Follow the format: `type: description`
  - `feat: add new typing exercise`
  - `fix: resolve timer bug`
  - `style: update button styling`
  - `docs: update README`

### Example Workflow
```bash
# 1. Clone the repository
git clone <repository-url>
cd I3_typing_master

# 2. Install dependencies
npm install

# 3. Create a new feature branch
git checkout -b feature/add-new-exercise

# 4. Make your changes
# ... edit files ...

# 5. Check what changed
git status
git diff

# 6. Stage and commit changes
git add .
git commit -m "feat: add new typing exercise with timer"

# 7. Push the branch
git push origin feature/add-new-exercise

# 8. Create a pull request (via GitHub/GitLab interface)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the terms specified in `LICENSE.txt`.

## 🆘 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process using port 8080
npx kill-port 8080
```

**Dependencies issues:**