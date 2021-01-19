import React, { useEffect, useState } from "react";
import "./main8Sytle.css";
import DownloadGauge from "../downloadGauge/DownloadGauge";
import { useDispatch, useSelector } from "react-redux";
import { NumberAnimate } from "./Main8Style";
import UploadGauge from "../uploadGauge/UploadGauge";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { DownloadCount, UploadCount } from "../../utils/funcs";
import ping from "web-pingjs";
import { useHistory } from "react-router-dom";

function Main8() {
    const serverIp = "92.114.17.213:5151";
    const downloadBitRequest = 25548000;
    const uploadBitRequest = 3548000;
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const [waiting, setWaiting] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [progressing, setProgressing] = useState(false);
    const [uploadProgressing, setUploadProgressing] = useState(false);
    const [byteArray, setByteArray] = useState();
    const [downloadTime, setDownloadTime] = useState();

    const downloadProgress = () => {
        setTimeout(() => {


            const arrAvg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
            let xhr = new XMLHttpRequest();
            let loadedDArr = [];
            let timeStampDArr = [];
            let speedDArr = [];

            xhr.onreadystatechange = () => {
                if (xhr.readyState != 4) {
                    return;
                }

                dispatch({
                    type: "DOWNLOAD_DATA",
                    payload: arrAvg(speedDArr).toFixed(1),
                });
            };

            let i = 0;
            xhr.addEventListener(
                "progress",
                (evt) => {
                    // console.log(evt,'dwonload')
                    timeStampDArr.push(evt.timeStamp / 1000); //make mili second to second
                    loadedDArr.push(evt.loaded * 8); //make byte to bit

                    if (i > 0) {
                        let time = timeStampDArr[i] - timeStampDArr[i - 1];
                        let load = loadedDArr[i] - loadedDArr[i - 1];
                        let speed = load / time / 1024 / 1024; // in Mbit/s
                        speedDArr.push(speed);
                        //console.log([time, load, speed, arrAvg(speedArr)]);
                        dispatch({
                            type: "DOWNLOAD_DATA",
                            payload: arrAvg(speedDArr).toFixed(1),
                        });
                        if (evt.lengthComputable) {
                            let percentComplete = (evt.loaded / evt.total) * 100;
                            setProgressing(percentComplete);
                            setDownloadTime(evt.timeStamp)
                            //console.log(timeStampDownloadArr,'download')

                            //  console.log(percentComplete);
                        }
                    }

                    i++;
                },
                false
            );

            xhr.open(
                "GET",
                `http://${serverIp}/new.mp4?_=${new Date().getTime()}`,
                true
            );

            xhr.addEventListener("load", function () {
                var ret = [];
                var len = this.responseText.length;
                var byte;
                for (var i = 0; i < len; i++) {
                    byte = (this.responseText.charCodeAt(i) & 0xFF) >>> 0;
                    ret.push(String.fromCharCode(byte));
                }
                var data = ret.join('');

                data = "data:application/pdf;base64," + btoa(data.substr(0, uploadBitRequest));
                setByteArray(data)
            }, false);

            xhr.setRequestHeader("Range", `bytes=1-${downloadBitRequest}`); // the bytes  you request
            xhr.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
            xhr.send(null);
        }, 1000);
    };

    const uploadProgress = () => {
        setTimeout(() => {
            const formData = new FormData()
            formData.append('File', byteArray)
            axios.post(`http://${serverIp}/api/Data/UploadFile`, formData, {
                onUploadProgress: (progressEvent) => {
                    let uploadCount = UploadCount(progressEvent.timeStamp, progressEvent.total, progressEvent.loaded)
                    // let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    dispatch({ type: 'UPLOAD_DATA', payload: uploadCount })
                    dispatch({ type: 'PRE_DOWNLOAD_DATA', payload: uploadCount })
                    // console.log(percentCompleted)
                }
            }).then(res => {
                // console.log(res.statusText)
                if (res.statusText === 'OK') setUploadProgressing(true)

            });
        }, 2000);
    };

    const getPing = async (ip) => {
        var t = [];
        for (var i = 1; i <= 13; i++) {
            if (i !== 1 && i !== 2 && i !== 3) {
                var m = await ping(ip);
                t.push(m);
            }
        }
        if (t.length > 0) {
            t = t.sort(function (a, b) {
                return a - b;
            });
        }
        var minPing = t[0];
        var maxPing = t[t.length - 1];
        var avgPing = 0;
        var jitter = 0;
        var plr = 10 - t.length;
        var Total = t.reduce(function (a, b) {
            return a + b;
        }, 0);
        if (Total !== 0) {
            avgPing = Total / t.length;
            avgPing.toFixed(1);
        }
        var jitterL = [];
        for (var item in t) {
            if (item !== "0") {
                var aaa = Math.abs(t[item] - t[item - 1]);
                if (aaa !== "NaN") jitterL.push(aaa);
            }
        }
        if (jitterL.length > 0) {
            var sum = jitterL.reduce(function (a, b) {
                return a + b;
            }, 0);
            jitter = sum / jitterL.length;
            if (jitter !== 0) {
                jitter = jitter.toFixed(1);
            }
        }
        return {
            pingArray: t,
            minPing: minPing,
            maxPing: maxPing,
            avgPing: avgPing,
            jitter: jitter,
            plr: plr * 10,
        };

    };

    useEffect(() => {
        downloadProgress();
        getPing(serverIp).then((res) => {
            dispatch({ type: "PING", payload: res.avgPing });
            dispatch({ type: "JITTER", payload: res.jitter });
            dispatch({ type: "POCKET_LOSS", payload: res.plr });
        });
        dispatch({ type: 'DOWNLOAD_DATA', payload: 0 })
        dispatch({ type: 'UPLOAD_DATA', payload: 0 })
    }, []);

    useEffect(() => {
        if (progressing === 100) {
            setTimeout(() => {
                setWaiting(true);
            }, 3000);
        }
    }, [progressing]);

    useEffect(() => {
        if (byteArray) uploadProgress();
    }, [byteArray]);

    useEffect(() => {
        if (uploadProgressing) {
            setRedirect(true);
        }
    }, [uploadProgressing]);


    // todo: set timeout to finish run
    return (
        <div className={"container"}>
            {redirect ? <Redirect to={"/webBrowsing"} /> : null}
            <div className={"center-side1"}>
                <div className={"items"}>
                    <div>
                        <div className={"download-box"}>
                            <div className={"icon-download-box"}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="506"
                                    height="2"
                                    viewBox="0 0 506 2"
                                >
                                    <line
                                        id="Line_12"
                                        data-name="Line 12"
                                        x1="506"
                                        transform="translate(0 1)"
                                        fill="none"
                                        stroke="#c971f8"
                                        stroke-width="2"
                                    />
                                </svg>
                            </div>
                            <div className={"blur-div1"} />
                        </div>
                        <div className={"download-box"}>
                            <div className={"blur-div"} />
                            <div className={"download-item"}>
                                <div className={"up-item"}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                    >
                                        <g
                                            id="Group_10"
                                            data-name="Group 10"
                                            transform="translate(-291 -72)"
                                        >
                                            <g
                                                id="Ellipse_13"
                                                data-name="Ellipse 13"
                                                transform="translate(291 72)"
                                                fill="none"
                                                stroke="#64f1e6"
                                                stroke-width="1.5"
                                            >
                                                <circle cx="10" cy="10" r="10" stroke="none" />
                                                <circle cx="10" cy="10" r="9.25" fill="none" />
                                            </g>
                                            <path
                                                id="Icon"
                                                d="M14.375,8.539H6.464L10.1,4.908,9.188,4,4,9.188l5.188,5.188.908-.908L6.464,9.836h7.911Z"
                                                transform="translate(291.813 91.188) rotate(-90)"
                                                fill="#64f1e6"
                                            />
                                        </g>
                                    </svg>
                                    <p>دانلود</p>
                                </div>
                                <div className={"down-item"}>
                                    {state.downloadData ? (
                                        <NumberAnimate data={state.downloadData}>
                                            {state.downloadData}
                                        </NumberAnimate>
                                    ) : (
                                            <span>____</span>
                                        )}
                                    <span style={{ opacity: "25%" }}>Mbps</span>
                                </div>
                            </div>

                            <div className={"download-item"}>
                                <div className={"up-item"}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                    >
                                        <g
                                            id="Group_16"
                                            data-name="Group 16"
                                            transform="translate(311 92) rotate(180)"
                                        >
                                            <g
                                                id="Ellipse_13"
                                                data-name="Ellipse 13"
                                                transform="translate(291 72)"
                                                fill="none"
                                                stroke="#c971f8"
                                                stroke-width="1.5"
                                            >
                                                <circle cx="10" cy="10" r="10" stroke="none" />
                                                <circle cx="10" cy="10" r="9.25" fill="none" />
                                            </g>
                                            <path
                                                id="Icon"
                                                d="M14.4,8.551H6.471L10.112,4.91,9.2,4,4,9.2l5.2,5.2.91-.91L6.471,9.852H14.4Z"
                                                transform="translate(291.798 91.202) rotate(-90)"
                                                fill="#c971f8"
                                            />
                                        </g>
                                    </svg>
                                    <p>آپلود</p>
                                </div>
                                <div className={"down-item"}>
                                    {state.uploadData ? (
                                        <NumberAnimate data={state.uploadData}>
                                            {state.uploadData}
                                        </NumberAnimate>
                                    ) : (
                                            <span>_ _</span>
                                        )}
                                    <span style={{ opacity: "25%" }}>Mbps</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"items-div"}>
                        <div className={"little-box"}>
                            <div className={"each-item"}>
                                <span>پینگ</span>
                                <span style={{ opacity: "25%" }}>(ping)</span>
                            </div>
                            <div className={"each-item"}>
                                <span
                                    style={{
                                        fontSize: "25px",
                                        fontFamily: "dosis",
                                    }}
                                >
                                    {state.ping ? state.ping : "--"}
                                </span>
                                <span style={{ opacity: "50%", fontFamily: "dosis" }}>ms</span>
                            </div>
                        </div>
                        <div className={"little-box"}>
                            <div className={"each-item"}>
                                <span>جیتر</span>
                                <span style={{ opacity: "25%" }}>(jitter)</span>
                            </div>

                            <div className={"each-item"}>
                                <span
                                    style={{
                                        fontSize: "25px",
                                        fontFamily: "dosis",
                                    }}
                                >
                                    {state.jitter ? state.jitter : "--"}
                                </span>
                                <span style={{ opacity: "50%", fontFamily: "dosis" }}>ms</span>
                            </div>
                        </div>
                        <div className={"little-box"}>
                            <div className={"each-item"}>
                                <span>اتلاف</span>
                                <span style={{ opacity: "25%" }}>(PLR)</span>
                            </div>
                            <div className={"each-item"}>
                                <h2 style={{ color: 'white' }}>{state.pocketLoss}  </h2>
                                {/*<span style={{opacity: '50%'}}>ms</span>*/}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"meters"}>
                    <div className={"canvas"}>
                        <div className={"out-circle"} />
                        <div className={"out-circle-border"} />
                        {waiting ? <UploadGauge /> : <DownloadGauge />}
                    </div>
                </div>
            </div>

            <div className={"page-footer row"}>
                <div className={"first-footer"}>
                    <p>Internet</p>
                    <p>Hiweb</p>
                </div>
                <div className={"second-footer"}>
                    <p>Download</p>
                    <p>161.65.54.94</p>
                </div>
                <div className={"third-footer"}>
                    <svg
                        id="_747357"
                        data-name="747357"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24.285"
                        height="24.285"
                        viewBox="0 0 24.285 24.285"
                    >
                        <g id="Group_19" data-name="Group 19">
                            <path
                                id="Path_33"
                                data-name="Path 33"
                                d="M20.729,3.556A12.143,12.143,0,0,0,3.556,20.729,12.143,12.143,0,0,0,20.729,3.556ZM7.89,2.823a10.943,10.943,0,0,0-.553.98A14.05,14.05,0,0,0,6.6,5.6H4.267A10.3,10.3,0,0,1,7.89,2.823ZM3.014,7.494H6.077a21.654,21.654,0,0,0-.461,3.7H1.942A10.168,10.168,0,0,1,3.014,7.494Zm0,9.3a10.168,10.168,0,0,1-1.072-3.7H5.616a21.659,21.659,0,0,0,.461,3.7Zm1.253,1.9H6.6a14.036,14.036,0,0,0,.74,1.794,10.955,10.955,0,0,0,.553.98A10.3,10.3,0,0,1,4.267,18.688Zm6.927,3.457a5.47,5.47,0,0,1-2.161-2.512q-.225-.45-.419-.945h2.58Zm0-5.355H8.022a19.372,19.372,0,0,1-.507-3.7h3.679Zm0-5.6H7.515a19.369,19.369,0,0,1,.507-3.7h3.172Zm0-5.6H8.614q.194-.494.419-.945A5.47,5.47,0,0,1,11.194,2.14V5.6Zm10.077,1.9a10.168,10.168,0,0,1,1.072,3.7H18.669a21.659,21.659,0,0,0-.461-3.7ZM20.018,5.6H17.689a14.035,14.035,0,0,0-.74-1.794,10.955,10.955,0,0,0-.553-.98A10.3,10.3,0,0,1,20.018,5.6ZM13.091,2.14a5.47,5.47,0,0,1,2.161,2.512q.225.45.419.945h-2.58Zm0,5.355h3.172a19.372,19.372,0,0,1,.507,3.7H13.091Zm2.161,12.139a5.47,5.47,0,0,1-2.161,2.512V18.688h2.58Q15.477,19.182,15.252,19.634Zm-2.161-2.843v-3.7H16.77a19.369,19.369,0,0,1-.507,3.7Zm3.3,4.672a10.943,10.943,0,0,0,.553-.98,14.05,14.05,0,0,0,.74-1.794h2.329A10.3,10.3,0,0,1,16.4,21.463Zm4.876-4.672H18.208a21.654,21.654,0,0,0,.461-3.7h3.675A10.168,10.168,0,0,1,21.271,16.791Z"
                                fill="#fff"
                            />
                        </g>
                    </svg>
                    <div className={"progress progressLine"}>
                        <div
                            className="progress-bar"
                            role="progressbar"
                            aria-valuenow="0"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: `${progressing}%`, background: "#4DD3C6" }}
                        />
                    </div>

                    <div className={"left-icon"}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="18"
                            viewBox="0 0 24 18"
                        >
                            <g
                                id="Rectangle_35"
                                data-name="Rectangle 35"
                                fill="none"
                                stroke="#fff"
                                stroke-width="2"
                            >
                                <rect width="24" height="18" rx="2" stroke="none" />
                                <rect x="1" y="1" width="22" height="16" rx="1" fill="none" />
                            </g>
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="2"
                            height="3"
                            viewBox="0 0 2 3"
                        >
                            <line
                                id="Line_10"
                                data-name="Line 10"
                                y1="3"
                                transform="translate(1)"
                                fill="none"
                                stroke="#fff"
                                stroke-width="2"
                            />
                        </svg>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="2"
                            viewBox="0 0 12 2"
                        >
                            <line
                                id="Line_9"
                                data-name="Line 9"
                                x2="12"
                                transform="translate(0 1)"
                                fill="none"
                                stroke="#fff"
                                stroke-width="2"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main8;
