# Frontend Software Engineer Assignment

Here is the challenge that we would like you to solve to assess your work and as preparation
for an in-depth technical interview. 

Please use React and make reasonable assumptions to come up with a solution that is useful 
from the user perspective and easy to run.

Develop a web-based application that allows users to dynamically add
and remove charts on a page. Users should be able to configure each
chart according to their preferences.

Each chart should be configurable in terms of:
-  **Data Source**: Allow users to plot data from series served by the
FRED API (described below).
- **Chart Types**: Provide an option to select different chart types,
including line and bar.
- **Title**: Provide an option for users to set a title for the chart.
- **Axes Configuration**: Enable users to customize the x and y-axes,
including intervals and labels.
- **Styling**: Allow users to customize the appearance of the chart,
including colors, line styles, or bar styles.

---

### FRED API
- API document https://research.stlouisfed.org/docs/api/fred/
- API Key: register to get your api key 
- Use the series API

---
### Hints
If you are having CORS issues on the API, you should investigate proxies.
