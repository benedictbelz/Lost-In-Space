class Tools {

    /************************/
    /******* METHODS ********/
    /************************/

    degreeToRadian(degree: number) {
        return (degree * Math.PI) / 180;
    }
    
    radianToDegree(radian: number) {
        return (radian * 180) / Math.PI;
    }
    
    normalizeRotation(rotation: number) {
        if (rotation > Math.PI * 2) {
            return (rotation %= Math.PI * 2);
        } else if (rotation < 0) {
            return (Math.PI * 2 - rotation);
        } else {
            return rotation;
        }
    }
}

export default new Tools();
