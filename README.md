# Frontend Engineer Assignment solution
This is a technical assessment project for front end developer position. 

## How to run:
1. Clone this repo
2. Run `pnpm i`
3. Obtain FRED api key by following this instruction: https://fred.stlouisfed.org/docs/api/api_key.html
4. Create **.env** file in the root of project with the following content:
```
VITE_FRED_API_KEY=<your api key>
```
5. Run `npm run dev`

---

## Task description
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
- API Key: `your api key` 
- Use the series API

---
### Hints
If you are having CORS issues on the API, you should investigate proxies.
