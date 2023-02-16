import React from "react";
import Typography from "@mui/material/Typography";

function Help() {
  return (
    <>
      <Typography
        spacing="3"
        align="center"
        justifyContent="center"
        variant="h2"
        noWrap
        sx={{
          mr: 1,
          display: { xs: "block", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          fontSize: { xs: 23, md: 80 },
          letterSpacing: ".2rem",
          color: "#fff",
          textDecoration: "none",
        }}
      >
        Open Telemetry
      </Typography>

      <Typography variant="p">
        This is an open source tool used to monitor{" "}
        <a href="smswithoutboders.com">SMSWithoutBorders</a> statistics.
      </Typography>

      <Typography variant="p">
        We use this data to provide and improve SMSWithoutBorders.
      </Typography>

      <Typography
        spacing="3"
        align="center"
        justifyContent="center"
        variant="h2"
        noWrap
        sx={{
          mr: 1,
          display: { xs: "block", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          fontSize: { xs: 20, md: 70 },
          color: "#fff",
          textDecoration: "none",
        }}
      >
        How To Use
      </Typography>

      <Typography variant="p">
        <b>Type Category</b> <br />
        Signed-up Users - See number of sign ups Available Users - See number of
        all available users Published - See the total number of all messages
        sent using SMSWithoutBorders
      </Typography>
    </>
  );
}

export default Help;
