import React, { useEffect, useState, useRef } from "react";
import WorkDetails from "../../components/WorkDetails/WorkDetails";

export default function Peinture() {
  return (
    <div>
      <WorkDetails typeOfWork="painting" />
    </div>
  );
}
