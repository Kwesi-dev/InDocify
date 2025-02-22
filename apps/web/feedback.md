# Improvement Plan for features

Let's improve the app based:

## First Issue: when to save repo files, repos, and github_docs
- Before saving repo files after extraction, check if a repo with the same name already exists in the database
- if it does, do not save the repo files again same for github_docs
  
- but then for github repos, if it does exist , alert the user that the repo has already exists

## Second Issue: Response Processing
- Some prompts showed as "processing" but then stopped without any feedback
- No UI indication of errors or retry options

### Resolution Plan for Second Issue
- Root cause: Search query tool fetching too many files and content, overwhelming the model context
- Proposed solutions:
  1. Reduce the amount of files and content that the search query tool fetches
  2. Implement smarter file selection based on prompt relevance
  3. Update system prompt to generate more precise keywords for the search query tool

## Third Issue: Repository Management
- Need ability to delete repositories
- Need ability to delete chats

## Fourth Issue: Talk Room UX
- Improve default view in Talk Room:
  - Show existing repos if available (instead of sidebar selection message)
  - If no repos exist, show:
    - Default public repo URL/upload drop zone
    - Clear onboarding message to get started

## Summary of Priority Improvements
1. Make prompt responses more robust
2. Implement proper error handling for failed prompts
3. Add repository deletion functionality
4. Improve initial user experience and onboarding
