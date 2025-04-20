// ==UserScript==
// @name         Bilibili直播间马赛克遮罩自动移除
// @namespace    https://github.com/Lapluma86/Bilibili-live-mask-remover
// @version      1.2
// @description  自动移除B站 MC、CS、OW、瓦罗兰特 等分区直播间的马赛克遮罩
// @author       Lapluma86
// @match        https://live.bilibili.com/*
// @icon         https://www.bilibili.com/favicon.ico
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    const TARGET_ID = "web-player-module-area-mask-panel";

    function removeMask() {
        const mask = document.getElementById(TARGET_ID);
        if (mask) {
            mask.remove();
            console.log(`已移除遮罩元素：${TARGET_ID}`);
            return true;
        }
        return false;
    }

    if (removeMask()) {
        return;
    }

    const observer = new MutationObserver((mutations, obs) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType === 1 && node.id === TARGET_ID) {
                    node.remove();
                    console.log(`已移除遮罩元素：${TARGET_ID}`);
                    obs.disconnect();
                    return;
                }
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
