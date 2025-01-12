import * as React from "react";

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3001";
const companyLogo = `${baseUrl}/static/logo.png`;

interface MagicLinkEmailProps {
  url: string;
}

export const MagicLinkEmail = ({ url }: MagicLinkEmailProps) => {
  return (
    <Html lang="en">
      <Head />
      <Preview>Sign in to inDocify</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <img
              src={companyLogo}
              width="40"
              height="40"
              alt="inDocify"
              style={logo}
            />
          </Section>

          <Heading style={h1}>Sign in to inDocify</Heading>

          <Text style={text}>Hi there,</Text>
          <Text style={text}>
            Click the button below to sign in to your inDocify account. This
            link will expire in 10 minutes and can only be used once.
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={url}>
              Sign in to inDocify
            </Button>
          </Section>

          <Text style={text}>
            If you didn't request this email, you can safely ignore it.
          </Text>

          <Hr style={hr} />

          <Text style={footer}>inDocify</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default MagicLinkEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  borderRadius: "5px",
  margin: "40px auto",
  padding: "20px",
  width: "465px",
};

const logoContainer = {
  marginBottom: "24px",
};

const logo = {
  margin: "0 auto",
  display: "block",
};

const h1 = {
  color: "#1a1f1a",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "1.4",
  margin: "0 0 24px",
  textAlign: "center" as const,
};

const text = {
  color: "#4c4c4c",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#ccff00",
  borderRadius: "5px",
  color: "#1a1f1a",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  width: "auto",
  padding: "16px 24px",
  cursor: "pointer",
};

const link = {
  color: "#ccff00",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "32px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
};
