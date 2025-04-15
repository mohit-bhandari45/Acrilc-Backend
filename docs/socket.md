# 📡 Socket.IO API Documentation

This server handles real-time messaging using **Socket.IO**, managing user presence, chat delivery, typing indicators, and message read statuses.

---

## 🧩 Socket Events

### 🔌 Connection

**Event:** `connection`  
**Description:** Triggered when a new client connects.

```js
socket.on("connect", () => {
    // Connection established
});
```

---

## 📥 Incoming Events (Client ➞️ Server)

### 1. `send-message`

Send a message to another user.

**Payload:**

```ts
{
    message: string;
    to: string; // recipient userId
}
```

**Behavior:**

- If recipient is online, message is delivered instantly.
- Otherwise, message is marked as "sent" and delivered when the recipient connects.

---

### 2. `typing-message`

Indicates that a user is typing.

**Payload:**

```ts
{
    to: string; // recipient userId
}
```

---

### 3. `stop-typing`

Indicates that a user has stopped typing.

**Payload:**

```ts
{
    to: string; // recipient userId
}
```

---

### 4. `read-messages`

Marks messages from a conversation as "read".

**Payload:**

```ts
{
    conversationId: string;
    fromUserId: string; // sender userId
}
```

---

## 📤 Outgoing Events (Server ➞️ Client)

### 1. `welcome`

Sent immediately after connection.

```ts
"Hi Welcome to the chats";
```

---

### 2. `receive-message`

Sent when a message is received (real-time or pending).

**Payload:**

```ts
{
    message: string;
    from: string; // sender userId
}
```

---

### 3. `user-typing`

Notifies that another user is typing.

**Payload:**

```ts
{
    from: string; // sender userId
}
```

---

### 4. `user-stop-typing`

Notifies that the user stopped typing.

**Payload:**

```ts
{
    from: string; // sender userId
}
```

---

## 🔄 Disconnection

**Event:** `disconnect`  
**Description:** Triggered when the user disconnects from the socket.  
**Behavior:**

- The server updates the user’s status to `isOnline: false`.

---

## 📡 Server Behavior

- Maps each `userId` to the corresponding `socket.id`.
- Automatically delivers pending messages when the user connects.
- Updates message statuses (`sent`, `delivered`, `read`) based on real-time interaction.

---

## 📂 Example Socket Client (Basic)

```js
const socket = io("http://localhost:PORT", {
    auth: {
        token: "yourJWTtokenHere",
    },
});

socket.on("welcome", (msg) => console.log(msg));

socket.emit("send-message", { message: "Hey there!", to: "USER_ID" });

socket.on("receive-message", ({ message, from }) => {
    console.log("Received:", message, "from:", from);
});
```
