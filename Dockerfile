FROM node:20

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN yarn install

# Build the project
RUN yarn build

# Expose port and start app
EXPOSE 3000
CMD ["yarn", "start"]
