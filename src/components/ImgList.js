import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Box } from "@mui/material";

export default function ImgList() {
  return (
    <ImageList cols={4}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            width={200}
            src={`${item.img}`}
            srcSet={`${item.img}`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={<span>by: {item.author}</span>}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: "/imgs/TM.png",
    title: "PRESENTACIONES",
  },
  {
    img: "/imgs/MY.png",
    title: "PRESENTACIONES",
  },
  {
    img: "/imgs/MZ.png",
    title: "PRESENTACIONES",
  },
  {
    img: "/imgs/RS.png",
    title: "PRESENTACIONES",
  },
  {
    img: "/imgs/BQ.png",
    title: "PRESENTACIONES",
  },
  {
    img: "/imgs/PI.png",
    title: "PRESENTACIONES",
  },
  {
    img: "/imgs/TR.png",
    title: "PRESENTACIONES",
  },
  {
    img: "/imgs/PT.png",
    title: "PRESENTACIONES",
  },
  {
    img: "/imgs/AJ.png",
    title: "PRESENTACIONES",
  },
  {
    img: "/imgs/MI.png",
    title: "PRESENTACIONES",
  },
  {
    img: "/imgs/JI.png",
    title: "PRESENTACIONES",
  },
  {
    img: "/imgs/NE.png",
    title: "PRESENTACIONES",
  },
  {
    img: "/imgs/HU.png",
    title: "PRESENTACIONES",
  },
  {
    img: "/imgs/VI.png",
    title: "PRESENTACIONES",
  },
  {
    img: "/imgs/SY.png",
    title: "PRESENTACIONES",
  },
  {
    img: "/imgs/CH.png",
    title: "PRESENTACIONES",
  },
];
