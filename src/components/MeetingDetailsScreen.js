import { CheckIcon, ClipboardIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export function MeetingDetailsScreen({
  onClickJoin,
  _handleOnCreateMeeting,
  participantName,
  setParticipantName,
  onClickStartMeeting,
}) {
  const [meetingId, setMeetingId] = useState("");
  const [meetingIdError, setMeetingIdError] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [iscreateMeetingClicked, setIscreateMeetingClicked] = useState(false);
  const [isJoinMeetingClicked, setIsJoinMeetingClicked] = useState(false);

  window.addEventListener("message", () => {
    console.log("message coming here!");
  });

  window.addEventListener("message", function (event) {
    // Check the origin for security purposes
    // if (
    //   event.origin != "http://localhost:3000" ||
    //   "https://recursing-saha.185-98-5-231.plesk.page"
    // ) {
    //   console.error("Received message from unauthorized origin:", event.origin);
    //   return;
    // }

    if (event.data.refreshToken && event.data.userData) {
      console.log("message is here!");

      localStorage.setItem("refreshToken", event.data.refreshToken);
      localStorage.setItem("userData", event.data.userData);
      console.log("Refresh Token:", event.data.refreshToken);
      console.log("User Data:", event.data.userData);
    }
  });

  const userDataString = localStorage.getItem("userData");

  const userData = userDataString ? JSON.parse(userDataString) : null;

  return (
    <div
      className={`flex flex-1 flex-col justify-center w-full md:p-[6px] sm:p-1 p-1.5`}
    >
      {iscreateMeetingClicked ? (
        <div className="border border-solid border-gray-400 rounded-xl px-4 py-3  flex items-center justify-center">
          <p className="text-white text-base">
            {`Код для входа : ${meetingId}`}
          </p>
          <button
            className="ml-2"
            onClick={() => {
              navigator.clipboard.writeText(meetingId);
              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              }, 3000);
            }}
          >
            {isCopied ? (
              <CheckIcon className="h-5 w-5 text-green-400" />
            ) : (
              <ClipboardIcon className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      ) : isJoinMeetingClicked ? (
        <>
          <input
            defaultValue={meetingId}
            onChange={(e) => {
              setMeetingId(e.target.value);
            }}
            placeholder={"Введите id комнаты"}
            className="px-4 py-3 bg-primary-light rounded-xl text-primary-red w-full text-center"
          />
          {meetingIdError && (
            <p className="text-xs  text-red-600">{`Пожалуйста введите верный код комнаты`}</p>
          )}
        </>
      ) : null}

      {(iscreateMeetingClicked || isJoinMeetingClicked) && (
        <>
          <input
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            placeholder="Введите ваш никнейм"
            className="px-4 py-3 mt-5 bg-primary-light rounded-xl text-primary-red w-full text-center"
          />
          <button
            disabled={participantName.length < 3}
            className={`w-full ${
              participantName.length < 3 ? "bg-gray-500" : "bg-primary-red"
            }  text-white px-2 py-3 rounded-xl mt-5`}
            onClick={(e) => {
              if (iscreateMeetingClicked) {
                onClickStartMeeting();
              } else {
                if (meetingId.match("\\w{4}\\-\\w{4}\\-\\w{4}")) {
                  onClickJoin(meetingId);
                } else setMeetingIdError(true);
              }
            }}
          >
            {iscreateMeetingClicked
              ? "Создать видео комнату"
              : "Присоединится к комнате"}
          </button>
        </>
      )}

      {!iscreateMeetingClicked && !isJoinMeetingClicked && (
        <div className="w-full md:mt-0 mt-4 flex flex-col">
          <div className="flex items-center justify-center flex-col w-full ">
            {userData.role === "showman" && (
              <>
                <button
                  className="w-full bg-primary-red text-white px-2 py-3 rounded-xl"
                  onClick={async (e) => {
                    const { meetingId, err } = await _handleOnCreateMeeting();

                    if (meetingId) {
                      setMeetingId(meetingId);
                      setIscreateMeetingClicked(true);
                    } else {
                      toast(`${err}`, {
                        position: "bottom-left",
                        autoClose: 4000,
                        hideProgressBar: true,
                        closeButton: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      });
                    }
                  }}
                >
                  Создать Видео Комнату
                </button>
              </>
            )}

            <button
              className="w-full bg-primary-light text-primary-dark px-2 py-3 rounded-xl mt-5"
              onClick={(e) => {
                setIsJoinMeetingClicked(true);
              }}
            >
              Присоединиться к комнате
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
