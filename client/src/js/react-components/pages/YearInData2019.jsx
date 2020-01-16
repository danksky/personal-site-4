import React, { Component } from 'react';

class YearInData2019 extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        import('../../../stylesheets/YearInData2019/YearInData2019.css');
        import('../../../stylesheets/YearInData2019/xs.css');
        import('../../../stylesheets/YearInData2019/s.css');
        import('../../../stylesheets/YearInData2019/m.css');
        import('../../../stylesheets/YearInData2019/l.css');
        import('../../../stylesheets/YearInData2019/xl.css');
    }

    render() {
        const overallObservedQuality = require('./charts/2019---Overall-Quality-(Observed)-(1).png');
        const sleepHistogram = require('./charts/Histogram-of-Sleep.png');
        const weekdayHistograms = require('./charts/Histograms-of-Weekdays.png');
        const socialScatter = require('./charts/Overall-Quality-of-Day-vs.-Social-Depth.png');
        const alcoholHistograms = require('./charts/Histograms-of-Alcohol.png');
        const alcoholScatter = require('./charts/Drinks-vs.-Quality-of-Day-(1).png');
        const workoutHistograms = require('./charts/Histogram-of-Workouts.png');
        const workoutScatter = require('./charts/Workout-Duration.png');
        const stressScatter = require('./charts/Stress-vs.-Overall-(Observed).png');
        const funScatter = require('./charts/Fun-vs.-Quality-of-Day.png');

        return (


            <div className="YearInData2019">
                <h1 id="year-in-data">Year in Data</h1>
                <p id="subtitle">On Jan 18, 2019, I decided to record my well-being. Here&#39;s how 2019 went for me. </p>
                <div id="toc">
                    <div className="toc-item"><a href="#dataset">DATASET</a></div>
                    <div className="toc-item"><a href="#legend">Legend</a></div>
                    <div className="toc-item"><a href="#insights">INSIGHTS</a></div>
                    <div className="toc-item"><a href="#overall">Overall</a></div>
                    <div className="toc-item"><a href="#sleep">Sleep</a></div>
                    <div className="toc-item"><a href="#weekdays">Weekdays</a></div>
                    <div className="toc-item"><a href="#social">Social</a></div>
                    <div className="toc-item"><a href="#alcohol">Alcohol</a></div>
                    <div className="toc-item"><a href="#exercise">Exercise</a></div>
                    <div className="toc-item"><a href="#stress">Stress</a></div>
                    <div className="toc-item"><a href="#fun">Fun</a></div>
                </div>
                <h2 id="dataset">Dataset</h2>
                <p>You can find the dataset here: <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vQzfe05dY0OSBINJcj6MA552AM8zKUrjdj-CnL-vZPqJ7nYxzP0xsWdg2sckisjVA5DCZ68-WN7s8Z8/pubhtml">Daniel Kawalsky 2019 Welfare Tracker</a></p>
                <h3 id="legend">Legend</h3>
                <div id="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th style={{ "textAlign": "left" }}>Meaning</th>
                                <th style={{ "textAlign": "right" }}>Units</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Overall Quality (Expected)</td>
                                <td style={{ "textAlign": "left" }}>how well I predict (up to the day before) this day will go</td>
                                <td style={{ "textAlign": "right" }}>10-Point Scale</td>
                            </tr>
                            <tr>
                                <td>Overall Quality (Observed)</td>
                                <td style={{ "textAlign": "left" }}>how well I thought the day went</td>
                                <td style={{ "textAlign": "right" }}>10-Point Scale</td>
                            </tr>
                            <tr>
                                <td>Homework (Expected)</td>
                                <td style={{ "textAlign": "left" }}>predicted homework (up to the day before) outside of lecture, or normal 8-hour workday (for USC, IBM &amp; LAT, respectively)</td>
                                <td style={{ "textAlign": "right" }}>Hours</td>
                            </tr>
                            <tr>
                                <td>Homework (Observed)</td>
                                <td style={{ "textAlign": "left" }}>homework outside of lecture, or normal 8-hour workday (for USC, IBM &amp; LAT, respectively)</td>
                                <td style={{ "textAlign": "right" }}>Hours</td>
                            </tr>
                            <tr>
                                <td>Workout Time</td>
                                <td style={{ "textAlign": "left" }}>time explicitly dedicated to fitness (prep, warm-up, exercise, rest, recovery)</td>
                                <td style={{ "textAlign": "right" }}>Hours</td>
                            </tr>
                            <tr>
                                <td>Journal Time</td>
                                <td style={{ "textAlign": "left" }}>time dedicated to journaling</td>
                                <td style={{ "textAlign": "right" }}>Hours</td>
                            </tr>
                            <tr>
                                <td>Alcohol</td>
                                <td style={{ "textAlign": "left" }}>how much I drank</td>
                                <td style={{ "textAlign": "right" }}>Standard Drinks</td>
                            </tr>
                            <tr>
                                <td>Stress</td>
                                <td style={{ "textAlign": "left" }}>stress experienced throughout the day</td>
                                <td style={{ "textAlign": "right" }}>10-Point Scale</td>
                            </tr>
                            <tr>
                                <td>Social (expansion)</td>
                                <td style={{ "textAlign": "left" }}>number of people I verbally connected with and &quot;met&quot;</td>
                                <td style={{ "textAlign": "right" }}>People (10-count max)</td>
                            </tr>
                            <tr>
                                <td>Social (depth)</td>
                                <td style={{ "textAlign": "left" }}>maximum level of depth I connected at with someone</td>
                                <td style={{ "textAlign": "right" }}>10-Point Scale</td>
                            </tr>
                            <tr>
                                <td>Sleep</td>
                                <td style={{ "textAlign": "left" }}>maximum level of depth I connected at with someone</td>
                                <td style={{ "textAlign": "right" }}>Hours</td>
                            </tr>
                            <tr>
                                <td>Dream</td>
                                <td style={{ "textAlign": "left" }}>my ability to recall what happened in my dream the night before</td>
                                <td style={{ "textAlign": "right" }}>describable fragments</td>
                            </tr>
                            <tr>
                                <td>Fun</td>
                                <td style={{ "textAlign": "left" }}>how fun the day was</td>
                                <td style={{ "textAlign": "right" }}>10-Point Scale</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h2 id="insights">Insights</h2>
                <h3 id="overall">Overall</h3>
                <p>Up next are 2 lines. Both represent the same core observed data, but the gray line is a smoothed-out version of the raw data. The pink line represents the actual <em>overall</em> quality of my day on a 10-point scale. There was one 10-rated day in 2019, which was in Coachella. That day was just awesome. But notice that the gray line doesn&#39;t get up to 10 on the same day? That&#39;s the down-side of smoothing-- while it&#39;s easier to see the steady rise and fall of my experience, it leaves out the actual extremes of what it means to just live. Unfortunately, all of the upcoming insights will do that, but the patterns they show, as (literally) insignificant as they seem, are the closest thing to an honest account of how 2019 went. </p>
                <a href={overallObservedQuality}><img src={overallObservedQuality} alt="chart of overall observe day quality throughout the year" /></a>
                <h3 id="sleep">Sleep</h3>
                <p>I sleep on average 7 hours and 25 minutes per night.</p>
                <img src={sleepHistogram} alt="histogram of the sleep I got in hours" />
                <h3 id="weekdays">Weekdays</h3>
                <p>I liked Sundays the least and Wednesdays the most, meaning I like hump day better than Saturday. Here, the X-axis is Overall Quality (Observed) and the height of the bars is the frequency that those quality ratings occurred.</p>
                <a href={weekdayHistograms}><img src={weekdayHistograms} alt="overlapping histograms of wednesdays' and sundays' overall quality" /></a>
                <p>(Repeating myself because I forgot the axes) Above, the X-axis is Overall Quality (Observed) and the height of the bars is the frequency that those quality ratings occurred.</p>
                <h3 id="social">Social</h3>
                <p>The <em>deeper</em> I connect with people, the better my day goes.</p>
                <a href={socialScatter}><img src={socialScatter} alt="scatterplot of the quality of my day over the depth I meet people with" /></a>
                <h3 id="alcohol">Alcohol</h3>
                <p>I like drinking more than not drinking. <span className="red">Red</span>=drinking, <span className="blue">Blue</span>=dry</p>
                <a href={alcoholHistograms}><img src={alcoholHistograms} alt="overlapping histograms of drinking and dry overall quality" /></a>
                <p>For the next one, notice that there isn&#39;t much of a correlation between how many drinks I have and how much my day improves. </p>
                <a href={alcoholScatter}><img src={alcoholScatter} alt="scatterplot of quality of day over drinks consumed" /></a>
                <h3 id="exercise">Exercise</h3>
                <p>I like exercising a little more than being sedentary; on average days that I exercised I rated ~0.07 points higher overall.</p>
                <p>In the <span className="red">red</span> are days that I worked out and in the <span className="blue">blue</span> are days where I did not. The x-axis is the Overall Quality of my day and the height of the bars is the frequency that those quality ratings occurred. </p>
                <a href={workoutHistograms}><img src={workoutHistograms} alt="overlapping histograms of exercising and non-exercising overall quality" /></a>
                <p>There isn&#39;t much of a correlation between how long I spent exercising and how well my day went. </p>
                <a href={workoutScatter}><img src={workoutScatter} alt="scatterplot of working out duration vs. quality of day" /></a>
                <h3 id="stress">Stress</h3>
                <p>The more stressed I am, the worse my day goes.</p>
                <a href={stressScatter}><img src={stressScatter} alt="scatterplot of stress vs. quality of day" /></a>
                <h3 id="fun">Fun</h3>
                <p>The more fun I have, the better my day goes.</p>
                <a href={funScatter}><img src={funScatter} alt="scatterplot of fun vs. quality of day" /></a>
            </div>
        )
    }
}

export default YearInData2019;
