import React, { useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';

const Schedule = (props) => {
    return (
        <div>
            <h1>Where Map will be called</h1>
            <LocateMap />
        </div>
    )
}

export default Schedule;