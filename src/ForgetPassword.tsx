import { useState } from "react";
import { Auth } from "aws-amplify";
import { Button, TextField, View, Heading } from "@aws-amplify/ui-react";

export default function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [stage, setStage] = useState<"request" | "reset">("request");
  const [message, setMessage] = useState("");

  const handleRequest = async () => {
    try {
      await Auth.forgotPassword(username);
      setStage("reset");
      setMessage("Code sent to your email.");
    } catch (error: any) {
      setMessage(error.message || "Error requesting reset.");
    }
  };

  const handleReset = async () => {
    try {
      await Auth.forgotPasswordSubmit(username, code, newPassword);
      setMessage("Password reset successful. You can now sign in.");
      setStage("request");
    } catch (error: any) {
      setMessage(error.message || "Error resetting password.");
    }
  };

  return (
    <View padding="2rem">
      <Heading level={3}>Forgot Password</Heading>

      <TextField
        label="Username (email)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        marginTop="1rem"
      />

      {stage === "reset" && (
        <>
          <TextField
            label="Verification Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            marginTop="1rem"
          />
          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            marginTop="1rem"
          />
        </>
      )}

      <Button onClick={stage === "request" ? handleRequest : handleReset} marginTop="1rem">
        {stage === "request" ? "Send Reset Code" : "Reset Password"}
      </Button>

      {message && <p style={{ color: "red", marginTop: "1rem" }}>{message}</p>}
    </View>
  );
}
