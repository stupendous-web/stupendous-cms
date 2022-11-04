import Image from "next/image";

export default function GetStarted({ image, paragraph, button, onClick }) {
  return (
    <div
      className={
        "uk-height-1-1 uk-width-1-1 uk-flex uk-flex-center uk-flex-middle"
      }
    >
      <div className={"uk uk-width-large uk-text-center"}>
        <div
          className={"uk-width-small uk-margin-auto-right uk-margin-auto-left"}
        >
          <Image src={image} />
        </div>
        <p>{paragraph}</p>
        <div className={"uk-button uk-button-primary"} onClick={onClick}>
          {button}
        </div>
      </div>
    </div>
  );
}
