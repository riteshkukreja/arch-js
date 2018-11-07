const showModuleInfo = (item) => {
    console.log(item);

    /** Zoom to fit viewport to clicked module */

    /** Populate information in a sidebar */

    /** Allow user to see exports and imports */

    /** Allow user to click on imports and navigate to clicked imports */
};

const attachModuleClickHandler = (canvas, modulePositionsMap, map) => {
    const canvasPosition = canvas.getBoundingClientRect();

    canvas.addEventListener("click", (ev) => {
        const scrollTop  = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        const posX = ev.clientX - canvasPosition.left + scrollLeft;
        const posY = ev.clientY - canvasPosition.top + scrollTop;

        const filterCondition = isInsideRect(posX, posY);

        /** check if any module lies on these coordinates */
        const iterator = modulePositionsMap.entries();
        let item = iterator.next();
        while(!item.done) {
            if(filterCondition(item.value[1])) {
                showModuleInfo(map.get(item.value[0]));
                break;
            }

            item = iterator.next();
        }

        ev.preventDefault();
        return false;
    });
};

module.exports = {
    showModuleInfo,
    attachModuleClickHandler
}