FROM gitpod/workspace-full

# Install custom tools, runtime, etc.
RUN npm i -g vercel && vercel login --github --oob && vercel link --confirm --scope glynhack && vercel pull