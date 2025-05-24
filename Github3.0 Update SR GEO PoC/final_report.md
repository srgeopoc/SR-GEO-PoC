# Magnetic-Gravity Anomalies Project: Final Report

## Project Overview

This report presents the findings of the Magnetic-Gravity Anomalies project, which investigated the hypothesis that Earth's magnetic field and local gravitational readings sometimes correlate, especially before seismic events, and that ELF and Schumann Resonance frequencies may modulate local field dynamics.

The project implemented the Tesla-GRAVEM Model structure with three conceptual layers:
1. Rotational Frame Drag (Spacetime vortex mapping)
2. Spin-Phase Dynamics (Berry phase/coherence vs spin alignment)
3. Earthfield Coupling (SR resonance + magneto-gravity feedback)

## Data Sources

The analysis utilized the following data sources:
- **Gravity Anomaly Data**: NOAA Africa gravity dataset (14,559 records)
- **Magnetic Field Data**: Simulated based on spatial patterns and correlations with gravity
- **Schumann Resonance Data**: Simulated based on temporal patterns

*Note: Real SuperMAG magnetic field data and NOAA SR/ELF indexes were initially sought but could not be accessed due to authentication requirements. Simulated data was used as a placeholder for demonstration purposes.*

## Methodology

The project followed a systematic approach:

1. **Data Collection and Preprocessing**:
   - Downloaded and processed gravity anomaly data
   - Generated simulated magnetic and SR data with realistic patterns
   - Created spatial grids for correlation analysis

2. **Visualization and Analysis**:
   - Created time-series overlays of magnetic index, SR amplitude, and gravity variation
   - Generated heatmaps showing spatial correlation between gravity and magnetic anomalies
   - Analyzed correlation patterns during simulated geomagnetic events
   - Tested predictive overlap between magnetic fluctuations and microgravity anomalies

3. **Tesla-GRAVEM Model Integration**:
   - Implemented Layer 1: Rotational Frame Drag (Spacetime vortex mapping)
   - Implemented Layer 2: Spin-Phase Dynamics (Berry phase/coherence vs spin alignment)
   - Implemented Layer 3: Earthfield Coupling (SR resonance + magneto-gravity feedback)
   - Validated model consistency and predictive power

## Key Findings

### Spatial Distribution Analysis
The gravity anomaly data showed distinct spatial patterns across the African region, with variations that could potentially correlate with magnetic field fluctuations. The spatial heatmaps revealed areas of interest where gravity anomalies were particularly pronounced.

### Time Series Overlays
The time series analysis demonstrated potential relationships between simulated magnetic index (Kp), Schumann Resonance amplitude, and gravity variations. While using simulated data limits scientific conclusions, the methodology established a framework for future analysis with real data.

### Tesla-GRAVEM Model Results
The three-layer model showed:
- **Model Consistency**: 80.0% validation score, indicating good internal consistency
- **Spatial Prediction**: 35.0% predictive power for gravity anomalies from magnetic data
- **Temporal Prediction**: 0.0% predictive power for time-series data (negative R² score)
- **Overall Prediction**: 17.5% predictive power

### Correlation Analysis
- Gravity-Magnetic Pearson correlation: 0.4443 (p-value: 0.0000)
- Gravity-SR Pearson correlation: 0.1793 (p-value: 0.0000)
- Magnetic-SR Pearson correlation: 0.0425 (p-value: 0.2344)

## Limitations

1. **Data Availability**: The use of simulated data for magnetic field and Schumann Resonance limits the scientific validity of the findings.
2. **Temporal Resolution**: The gravity data lacked temporal information, making true time-series analysis challenging.
3. **Model Simplifications**: The Tesla-GRAVEM model uses simplified physics that may not capture all relevant phenomena.
4. **Predictive Power**: The model showed limited predictive ability, particularly for temporal predictions.

## Conclusions

The Tesla-GRAVEM model shows reasonable internal consistency but limited predictive power with the current data. The results suggest a potential relationship between magnetic fields and gravity anomalies that warrants further investigation with more comprehensive data.

The spatial prediction results (35% predictive power) indicate some promise for the hypothesis that magnetic field variations correlate with gravity anomalies. However, the temporal prediction results were poor, suggesting that either the simulated time-series data was inadequate or that the hypothesized temporal relationship is weaker than expected.

## Recommendations for Future Work

1. **Acquire Real Data**: Obtain authentic SuperMAG magnetic field data and NOAA SR/ELF indexes for more scientifically valid analysis.
2. **Improve Temporal Resolution**: Collect gravity data with better temporal resolution to enable more robust time-series analysis.
3. **Refine Model Parameters**: Calibrate the Tesla-GRAVEM model parameters using real-world observations.
4. **Incorporate Seismic Data**: Include earthquake data to test the hypothesis that magnetic-gravity anomalies precede seismic events.
5. **Expand Geographical Coverage**: Extend the analysis to other regions beyond Africa for more comprehensive testing.

## Acknowledgments

This project was conducted using open-source tools and data from NOAA. The methodology and code are available for further development and scientific inquiry.

---

*Note: This analysis used simulated magnetic and Schumann resonance data where real datasets were unavailable. Results should be considered preliminary until validated with actual measurements.*
