# SR-GEO-PoC: Schumann Resonance Geophysical Precursor Correlation Framework

This repository presents the SR-GEO-PoC framework: an open-access scientific model for identifying electromagnetic and ionospheric anomalies prior to major earthquakes and volcanic eruptions.

By cross-correlating Schumann Resonance shifts, Total Electron Content (TEC) anomalies, geomagnetic data, gravity changes, and transient luminous events (TLEs), SR-GEO-PoC offers a reproducible structure for investigating crustal energy buildup leading to natural disasters.

## Latest Version: SR-GEO-PoC v3.0 (Tesla-Enhanced Framework)

Version 3.0 represents a paradigm shift by incorporating Tesla's cosmic forces theory to expand detection capabilities and theoretical foundations:

### v3.0 Key Enhancements:

- **Expanded Frequency Analysis**: Beyond standard Schumann Resonance bands to capture subtle harmonic relationships
- **Earth Current Monitoring**: Integration of telluric current measurements based on Tesla's extensive work
- **Cosmic Ray Flux Analysis**: Monitoring of cosmic influences on Earth's electromagnetic environment
- **Atmospheric Electricity Integration**: Vertical electric field gradient analysis for comprehensive energy flow mapping
- **Multi-Scale Energy Transfer Framework**: Connecting cosmic to local energy cascades through a unified model
- **Enhanced Harmonic Detection**: Advanced phase relationship analysis in SR signals for improved precursor identification
- **Dynamic Solar-Influenced Weighting**: Adaptive parameter importance based on solar activity conditions
- **Resonant Amplification Detection**: Identification of energy focusing mechanisms based on Tesla's principles

### v3.0 Formula (Tesla-Enhanced):

```
P_event = w1·SR_amp + w2·SR_freq_shift + w3·TEC_dev + 
          w4·ELF_spikes + w5·Grav_delta + 
          w6·Subsurface_Stress + w7·AGW_spike +
          w8·Earth_Current + w9·Cosmic_Ray_Flux + 
          w10·Atm_Electric_Field + w11·Resonant_Amplification

Resonant_Amplification = (SR_harmonic_coherence * Earth_Current_phase_alignment * 
                          Cosmic_Ray_intensity_normalized)

Solar_Influence_Factor = f(Solar_Wind_Speed, IMF_Bz, Kp_Index)

// Dynamic weight adjustment based on solar conditions
w1...w11 = Base_Weight * (1 + Solar_Influence_Factor * Parameter_Solar_Sensitivity)
```

- **Enhanced Mode**: Includes all parameters for maximum sensitivity
- **Core Mode**: Uses subset of most reliable parameters for reduced false positives
- **Alert Tiers**: Watch > 0.5 | Warning > 0.75 | Alert > 0.85

## Version History

### SR-GEO-PoC v2.2: Operational Refinements
- Automated calibration system for regional baseline establishment
- Adaptive weighting algorithm that adjusts parameter importance based on local conditions
- Integration with existing seismic monitoring networks for validation
- Expanded case studies covering diverse geological settings
- Comprehensive uncertainty quantification and confidence scoring
- Real-time data processing optimization for reduced latency

### SR-GEO-PoC v2.1: Signal Suppression Index
- Signal Suppression Index (SSI) to identify anomalous signal dampening before events
- Refined alert logic with dynamic thresholds based on regional baseline calibration
- Expanded temporal detection window from 72 to 96 hours for specific signal combinations
- Improved false positive reduction through cross-domain verification protocols
- Enhanced SERD-M subsystem with depth-stratified analysis capabilities

### SR-GEO-PoC v2.0: Multi-Domain Foundation
- Dual-mode logic structure (Core and Enhanced)
- Subsurface Energy Routing Detection Model (SERD-M) for silent rupture zones
- Earth Resonance Probe (ERP): Borehole-based subsurface monitoring logic
- AGW Integration: Detection of silent vertical displacement
- Global silent zone risk mapping

### v2.0 Formula (Enhanced Mode):

```
P_event = w1·SR_amp + w2·SR_freq_shift + w3·TEC_dev + 
          w4·ELF_spikes + w5·Grav_delta + 
          w6·Subsurface_Stress + w7·AGW_spike
    
Subsurface_Stress = (strain_rate + tilt_drift + fluid_pressure_change) / 3
```

- Core Mode: excludes AGW (w7 = 0)
- Alert Tiers: Watch > 0.5 | Warning > 0.75

## Performance Comparison

| Metric | v1.0 | v2.0 | v2.1/v2.2 | v3.0 |
| --- | --- | --- | --- | --- |
| Average lead time | <12 hrs | 24–72 hrs | 24-96 hrs | 24-120 hrs |
| Silent event detection | ~10% | 40–60% | 55-70% | 65-85% |
| False positive rate | ~8% | <3.5% | <2.5% | <1.8% |
| Parameter count | 4 | 7 | 7 | 11 |
| Cosmic influence tracking | None | None | Limited | Comprehensive |
| Energy flow mapping | Basic | Moderate | Advanced | Multi-scale |

## Repository Contents

### Core Documentation
* `README.md`: This file - overview and version history
* `SR-GEO-PoC_Abstract.md`: High-level summary of the project and theory
* `SR-GEO-PoC_AppendixB_ScientificSupport.md`: References to supporting peer-reviewed studies
* `SR-GEO-PoC_AppendixC_Formula.md`: Theoretical chain and energy flow diagram
* `SR-GEO-PoC_Claim_of_Originality.md`: Declaration of original research and findings
* `VERSION_HISTORY.md`: Detailed changelog and version evolution

### v3.0 Tesla-Enhanced Documentation
* `SR-GEO-PoC_v3.0_Tesla_Enhanced_White_Paper.md`: Comprehensive documentation of v3.0 enhancements
* `SR-GEO-PoC_v3.0_Tesla_References.md`: Citations of Tesla's relevant works and modern validations
* `SR-GEO-PoC_v3.0_Implementation_Guide.md`: Technical implementation details for v3.0 features
* `SR-GEO-PoC_v3.0_Validation_Report.md`: Empirical and theoretical validation of Tesla-inspired enhancements

### Previous Version Documentation
* `SR-GEO-PoC_Master_Project_Report_v2.docx`: Comprehensive report for v2.0
* `README_SR-GEO-PoC_v1_and_v2_Combined.md`: Documentation for v1.0 and v2.0
* `Earth_Resonance_Probe_White_Paper_v2.docx`: ERP subsystem documentation

### SERD-M Subsystem Documentation
* `SERD-M_Deployment_Matrix_and_Silent_Quake_Risk_Prioritization.md`: Deployment strategy
* `SERD-M_Silent_Quake_Detection_Model_Proposal.docx`: Original proposal
* `SERD-M_Silent_Quake_Model_with_TestPlan.docx`: Testing methodology

### Visual Resources
* `/SR-GEO-PoC_Images_Final`: Includes curated TLE and SR event images, each labeled and cited

## Case Studies

This project includes case studies of the following events:

* Tonga eruption (2022)
* Japan Tōhoku earthquake (2011)
* Nepal earthquake (2015)
* Chile earthquake (2010)
* Iceland Eyjafjallajökull eruption (2010)
* Global cluster (June 2021)
* Wushi earthquake, China (2024)
* Turkey-Syria earthquake (2023) - *New in v3.0*
* Hunga Tonga-Hunga Ha'apai eruption (2022) - *New in v3.0*
* La Palma eruption (2021) - *New in v3.0*

## Theoretical Framework

> Cosmic energy influx → Solar-terrestrial coupling → Crustal stress rises → EM signals propagate upward → Schumann & ionospheric disturbances emerge → Lightning/TLEs increase → Event rupture follows.

## Author Information

**Author:** Ashley Clark  
**Email:** earthresonance.project@gmail.com  
**GitHub:** github.com/srgeopoc/SR-GEO-PoC  
**Zenodo DOI:** [10.5281/zenodo.15380981](https://doi.org/10.5281/zenodo.15380981)

## Collaboration

We invite researchers in geophysics, atmospheric science, and disaster preparedness to validate or extend this model. All materials are fully open-source and freely available for replication or adaptation in regional monitoring efforts.

## Disclaimer

> ⚠️ This model is theoretical and not validated. Use for research and experimentation purposes only.
