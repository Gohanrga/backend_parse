FROM node:20.11.0

# Set environment variables
ENV DB_STRING_CONNECTION=mongodb+srv://gohanrga:xHzOMop6mqYo1RY4@cluster0.gnv90.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]