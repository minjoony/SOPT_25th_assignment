const groupMixer = {
    mix: (memberArray) => {
        const mixArray = [...memberArray];
        mixArray.forEach(element => {
            
            const targetIdx = parseInt(Math.random() * (memberArray.length -1));
            const tmp = element.groupIdx;
            element.groupIdx = mixArray[targetIdx].groupIdx;
            mixArray[targetIdx].groupIdx = tmp;
        });
        return mixArray;
    }
};
module.exports = groupMixer;