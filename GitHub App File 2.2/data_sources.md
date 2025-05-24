# SR-GEO-PoC Tracker Data Sources

## Schumann Resonance Data
- **HeartMath Institute**: https://www.heartmath.org/gci/gcms/live-data/ (Live data visualization)
- **GeoCenter.info**: https://geocenter.info/en/monitoring/schumann (Online monitoring)
- **Sierra Nevada ELF Station**: Historical dataset available via Science Direct

## Total Electron Content (TEC) Data
- **NOAA Space Weather Prediction Center**: https://www.swpc.noaa.gov/products/north-american-total-electron-content (Near real-time assessment)
- **NOAA NCEI**: https://www.ncei.noaa.gov/products/space-weather/ionospheric-program/total-electron-content (Historical data)
- **DLR IMPC**: https://impc.dlr.de/products/total-electron-content/near-real-time-tec/near-real-time-tec-maps-global (Global TEC maps with 5-minute latency)
- **Australian Space Weather Services**: https://www.sws.bom.gov.au/Satellite/2/2 (Near real-time global maps)

## ELF Burst Activity Data
- **Research papers with historical data**: Multiple academic sources have published ELF data related to earthquake precursors
- **No identified public real-time source**: May require manual data entry or collaboration with research institutions

## Gravity Field Data
- **Research publications**: Several papers mention gravity field changes as earthquake precursors
- **GPS displacement data**: Can be used as proxy for gravity changes in some cases
- **No identified public real-time source**: May require manual data entry or collaboration with research institutions

## Data Integration Challenges
- Real-time Schumann Resonance and TEC data appear to be publicly available through various sources
- ELF and gravity field data may require manual entry or special arrangements with research institutions
- Data format standardization will be necessary across different sources
- Historical data availability varies significantly between parameters

## Next Steps
1. Verify data accessibility and format for each identified source
2. Design data scrapers for sources with no direct API
3. Create a flexible database schema to accommodate all parameter types
4. Implement a manual data entry interface for parameters without reliable real-time sources
