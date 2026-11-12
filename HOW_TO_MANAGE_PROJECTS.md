# How to Add, Edit, and Delete Projects

This guide explains how to manage your ML projects on the portfolio website.

## 📝 Adding a New Project

### Step 1: Create a Markdown File

Create a new `.md` file in the `content/projects/` directory. The filename will become the URL slug.

**Example**: `content/projects/my-awesome-project.md`

### Step 2: Add Frontmatter

At the top of the file, add frontmatter with project details:

```markdown
---
title: "My Awesome ML Project"
slug: "my-awesome-project"
description: "A brief 1-2 sentence description of your project"
category: "Computer Vision"
tags: ["Python", "TensorFlow", "OpenCV"]
date: "2024-01-15"
featured: true
image: "/images/projects/my-awesome-project/preview.svg"
githubUrl: "https://github.com/Vinz602/my-awesome-project"
demoUrl: "https://demo-link.com"
---
```

**Required fields:**
- `title` - Project title
- `slug` - URL-friendly name (usually matches filename)
- `description` - Short description (appears on project cards)
- `category` - Must be one of:
  - `"Computer Vision"`
  - `"NLP"`
  - `"Deep Learning"`
  - `"Data Analysis"`
- `tags` - Array of technologies used
- `date` - Project date (YYYY-MM-DD format)
- `featured` - `true` to show on homepage, `false` otherwise
- `image` - Path to preview image

**Optional fields:**
- `githubUrl` - Link to GitHub repository
- `demoUrl` - Link to live demo

### Step 3: Write Project Content

Below the frontmatter, write your project details in Markdown:

```markdown
## Problem Statement

Describe the problem your project solves...

## Approach

Explain your methodology...

## Technologies

- Python 3.9
- TensorFlow
- NumPy

## Results

Share your results and metrics...

## Challenges & Solutions

### Challenge 1
Description...

**Solution:** How you solved it...

## Future Improvements

- Enhancement 1
- Enhancement 2
```

### Step 4: Add Project Images

1. Create a folder in `public/images/projects/` with your project slug:
   ```
   public/images/projects/my-awesome-project/
   ```

2. Add your preview image:
   ```
   public/images/projects/my-awesome-project/preview.jpg
   ```

3. Update the `image` field in frontmatter:
   ```yaml
   image: "/images/projects/my-awesome-project/preview.jpg"
   ```

**Tip**: Use the placeholder SVG while you prepare images:
```yaml
image: "/images/projects/placeholder.svg"
```

### Step 5: Verify

1. Save the file
2. Restart the dev server (if running)
3. Your project should appear automatically!

---

## ✏️ Editing an Existing Project

1. Open the project's `.md` file in `content/projects/`
2. Edit the frontmatter or content
3. Save the file
4. Changes appear automatically (may need to refresh browser)

---

## 🗑️ Deleting a Project

### Method 1: Delete the Markdown File

1. Delete the `.md` file from `content/projects/`
2. The project will no longer appear on the site

### Method 2: Hide Without Deleting

Set `featured: false` in frontmatter to remove from homepage, or move the file to a backup folder outside `content/projects/`.

---

## 🎨 Project Template

Copy this template for new projects:

```markdown
---
title: "Project Title Here"
slug: "project-slug-here"
description: "One or two sentence description for project cards"
category: "Computer Vision"
tags: ["Python", "TensorFlow", "Keras"]
date: "2024-01-15"
featured: false
image: "/images/projects/placeholder.svg"
githubUrl: "https://github.com/Vinz602/repo-name"
demoUrl: ""
---

## Problem Statement

What problem does this project solve?

## Approach

How did you approach solving it?

### Data & Preprocessing

- Dataset details
- Preprocessing steps

### Model Architecture

- Model type
- Key components

## Technologies

- **Python** - Programming language
- **TensorFlow** - Deep learning framework
- **Pandas** - Data manipulation

## Results

### Metrics

- **Accuracy**: 95%
- **Precision**: 94%
- **Recall**: 93%

### Key Findings

Describe your main findings...

## Challenges & Solutions

### Challenge 1: Problem Description

Explain the challenge...

**Solution:** How you solved it...

## Visual Demonstrations

Add images or screenshots here.

## Live Demo

[Try the demo](your-demo-url)

## Source Code

[View on GitHub](https://github.com/Vinz602/repo-name)

## Future Improvements

- Enhancement idea 1
- Enhancement idea 2
- Enhancement idea 3
```

---

## 📋 Quick Reference

### File Location
```
content/projects/your-project-name.md
```

### Image Location
```
public/images/projects/your-project-name/preview.jpg
```

### Valid Categories
- `"Computer Vision"`
- `"NLP"`
- `"Deep Learning"`
- `"Data Analysis"`

### Date Format
```
"YYYY-MM-DD"  (e.g., "2024-01-15")
```

---

## 🔧 Troubleshooting

**Problem: Project not appearing**
- ✅ Check filename ends with `.md`
- ✅ Verify frontmatter YAML syntax (no syntax errors)
- ✅ Ensure all required fields are present
- ✅ Check category spelling matches exactly
- ✅ Restart dev server: `npm run dev`

**Problem: Image not loading**
- ✅ Verify image path starts with `/`
- ✅ Check file exists in `public/` directory
- ✅ Image extension matches frontmatter (`.jpg`, `.png`, `.svg`)
- ✅ Use placeholder.svg while testing

**Problem: Category filter not working**
- ✅ Category must match exactly (case-sensitive)
- ✅ Use quotes around category in frontmatter
- ✅ Check for typos

---

## 💡 Tips

1. **Use the placeholder image** while developing:
   ```yaml
   image: "/images/projects/placeholder.svg"
   ```

2. **Start with featured: false** until ready:
   ```yaml
   featured: false
   ```

3. **Keep descriptions concise** (1-2 sentences for card view)

4. **Add GitHub links** to showcase your code:
   ```yaml
   githubUrl: "https://github.com/Vinz602/project-name"
   ```

5. **Use consistent categories** for better filtering

6. **Copy existing projects** as templates to maintain consistency

---

## 📚 Example: Complete Workflow

Let's add a new "Object Detection" project:

1. **Create file**: `content/projects/object-detection.md`

2. **Add content**:
```markdown
---
title: "Real-Time Object Detection System"
slug: "object-detection"
description: "Built a YOLO-based system for real-time object detection with 85% mAP"
category: "Computer Vision"
tags: ["Python", "YOLO", "OpenCV", "PyTorch"]
date: "2024-02-20"
featured: true
image: "/images/projects/placeholder.svg"
githubUrl: "https://github.com/Vinz602/object-detection"
---

## Problem Statement
...
```

3. **Add image later**:
   - Create: `public/images/projects/object-detection/preview.jpg`
   - Update: `image: "/images/projects/object-detection/preview.jpg"`

4. **Verify**: Visit `http://localhost:3000/projects/object-detection/`

Done! Your project is live! 🎉

---

**Need more help?** Check existing project files in `content/projects/` for examples.
