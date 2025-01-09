# Community Bot for MrDemonWolf, Inc.

Community Discord bot for MrDemonWolf, Inc. Community

Join our community across various platforms! Discover more about us, get the latest updates, and engage with our content. Built by a passionate furry web developer, MrDemonWolf, who loves tech, gaming, and creating engaging experiences for the community.

---

## Getting Started

### Setting Up the Database

Follow these steps to set up your database quickly using Docker:

#### Prerequisites

1. **Install Docker**  
   If you don't already have Docker installed, follow the instructions in the [Docker Documentation](https://docs.docker.com/get-docker/) to set it up.

2. **Install Docker Compose**  
   Docker Compose is usually included with Docker Desktop. If you need to install it separately, follow the guide in the [Docker Compose Documentation](https://docs.docker.com/compose/install/).

#### Steps to Run the Database

1. **Clone the Repository**  
   Ensure you have the repository containing the `docker-compose.yml` file.

2. **Run Docker Compose**  
   Open a terminal in the directory containing the `docker-compose.yml` file and run:
   ```bash
   docker-compose up
   ```

---

### Setting Up Discord Bot Integration

Follow these steps to create your Discord bot application and obtain your bot token:

1. **Visit the Discord Developer Portal**  
   Go to the [Discord Developer Portal](https://discord.com/developers/applications).

2. **Create a New Application**

   - Click the **"New Application"** button.
   - Give your application a name and click **"Create"**.

3. **Set Up Your Bot**

   - Navigate to the **"Bot"** tab on the left-hand menu.
   - Click **"Add Bot"**, then confirm by clicking **"Yes, do it!"**.

4. **Copy Your Bot Token**

   - Under the **"Bot"** tab, click **"Reset Token"**, then **"Yes, do it!"**.
   - Copy the generated token and keep it secure.

5. **Add Your Bot to a Server**

   - Navigate to the **"OAuth2"** tab.
   - Under **"OAuth2 URL Generator"**, select the **"bot"** scope.
   - Assign appropriate permissions for your bot using the **"Bot Permissions"** section.
   - Copy the generated URL and open it in your browser to invite the bot to your server.

6. **Configure Your Bot**  
   Add the bot token to the `.env` file:
   ```env
   DISCORD_BOT_TOKEN=your-bot-token
   ```

---

**Note:** Ensure you keep your bot token secure. Do not share it publicly.

---

## License

![GitHub license](https://img.shields.io/github/license/MrDemonWolf/community-bot-discord.svg?style=for-the-badge&logo=github)

---

## Contact

If you have any questions, suggestions, or feedback, feel free to reach out to us on Discord!

- Discord: [Join our server](https://mrdwolf.com/discord)

Thank you for choosing FluffBoost to add motivation and positivity to your Discord server!

Made with ❤️ by [MrDemonWolf, Inc.](https://www.mrdemonwolf.com)
