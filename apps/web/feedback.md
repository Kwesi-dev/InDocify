# Improvement Plan for features

Let's improve the app based:

## First Issue: Pricing
- How do I keep track of my subscriptions in the user table in supabase?
- How do I know a user is subscribed?
- How do I allow a user to cancel their subscription?

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
