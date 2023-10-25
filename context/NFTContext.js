/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import FormData from "form-data";
import axios from "axios";

import { MarketAddress, MarketAddressABI } from "./constants";

// eslint-disable-next-line operator-linebreak
const JWT =
  // eslint-disable-next-line max-len
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkODEyYzg0Yy0zYjhjLTRjM2MtODE3Mi04NWU3NWMzOGMwYTgiLCJlbWFpbCI6Im1kcy5tdWhpYkBvdXRsb29rLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIyZDQ4MjU3YWUyYzI0ZDZlYWI1NSIsInNjb3BlZEtleVNlY3JldCI6IjFiMzExMjVjZDhiZmI4YmUyN2YxYjc0ZDIyYzJhMzEyMjQ1MjE0MDE0ZTdmOWQzMDllMzA2NWYzODA3NDA2NTYiLCJpYXQiOjE2NzI4MDE3MjR9.hKfk0rhiYDx_bFUgL0xs89ZU1DRnbD7ENzWCE7SBW4o";

const fetchContract = (signerOrProvider) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider);
export const NFTContext = React.createContext();
export const NFTProvider = ({ children }) => (
  <NFTContext.Provider value={{}}>{children}</NFTContext.Provider>
);
