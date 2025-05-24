#!/usr/bin/env python3
"""
Tesla-GRAVEM Model Integration for the Magnetic-Gravity Anomalies project.
This script implements the three-layer model structure described in the project requirements:
1. Rotational Frame Drag (Spacetime vortex mapping)
2. Spin-Phase Dynamics (Berry phase/coherence vs spin alignment)
3. Earthfield Coupling (SR resonance + magneto-gravity feedback)
"""

import pandas as pd
import numpy as np
import os
import matplotlib.pyplot as plt
from datetime import datetime, timedelta
import seaborn as sns
from scipy import stats, signal, interpolate
from matplotlib.colors import LinearSegmentedColormap
import matplotlib.animation as animation
from mpl_toolkits.mplot3d import Axes3D

# Set paths
DATA_DIR = "/home/ubuntu/magnetic_gravity_project/data"
PROCESSED_DIR = "/home/ubuntu/magnetic_gravity_project/data/processed"
VISUALIZATION_DIR = "/home/ubuntu/magnetic_gravity_project/visualizations"
MODEL_DIR = "/home/ubuntu/magnetic_gravity_project/model"

# Ensure directories exist
os.makedirs(PROCESSED_DIR, exist_ok=True)
os.makedirs(VISUALIZATION_DIR, exist_ok=True)
os.makedirs(MODEL_DIR, exist_ok=True)

class TeslaGravemModel:
    """
    Implementation of the Tesla-GRAVEM Model structure for analyzing
    magnetic-gravity anomalies with Earth as a resonant system.
    """
    
    def __init__(self):
        """Initialize the model with default parameters."""
        self.data = None
        self.spatial_data = None
        self.time_series = None
        self.model_params = {
            'earth_radius': 6371.0,  # km
            'earth_mass': 5.972e24,  # kg
            'earth_magnetic_field_strength': 25.0,  # μT (microtesla)
            'schumann_base_frequency': 7.83,  # Hz (first mode)
            'gravitational_constant': 6.67430e-11,  # m^3 kg^-1 s^-2
            'coupling_strength': 0.4,  # Coupling between magnetic and gravity fields
            'resonance_factor': 0.25,  # SR influence on coupling
            'frame_drag_coefficient': 0.15,  # Rotational frame drag effect
            'berry_phase_factor': 0.3,  # Quantum spin-phase dynamics factor
        }
        
        # Model state variables
        self.vortex_map = None
        self.spin_phase_coherence = None
        self.resonance_coupling = None
        
        print("Tesla-GRAVEM Model initialized with default parameters.")
    
    def load_data(self):
        """Load processed gravity, magnetic, and SR data."""
        print("Loading processed data for model integration...")
        
        try:
            # Load spatial grid data
            spatial_file = os.path.join(PROCESSED_DIR, "spatial_grid_data.csv")
            self.spatial_data = pd.read_csv(spatial_file)
            print(f"Successfully loaded {len(self.spatial_data)} spatial grid records.")
            
            # Load time series data
            time_series_file = os.path.join(PROCESSED_DIR, "simulated_time_series.csv")
            self.time_series = pd.read_csv(time_series_file)
            self.time_series['date'] = pd.to_datetime(self.time_series['date'])
            print(f"Successfully loaded {len(self.time_series)} time series records.")
            
            # Load correlation metrics
            metrics_file = os.path.join(PROCESSED_DIR, "correlation_metrics.txt")
            with open(metrics_file, 'r') as f:
                metrics_text = f.read()
                print("Correlation metrics loaded.")
            
            return True
        except Exception as e:
            print(f"Error loading data: {e}")
            return False
    
    def implement_layer1_rotational_frame_drag(self):
        """
        Implement Layer 1: Rotational Frame Drag (Spacetime vortex mapping)
        
        This layer models how Earth's rotation creates a spacetime vortex that
        affects both gravitational and magnetic fields.
        """
        print("Implementing Layer 1: Rotational Frame Drag...")
        
        if self.spatial_data is None:
            print("Error: No spatial data loaded.")
            return False
        
        # Create a copy of spatial data for model calculations
        model_data = self.spatial_data.copy()
        
        # Calculate latitude-dependent rotational velocity
        # Earth's equatorial rotation speed is about 465 m/s
        model_data['rot_velocity'] = 465.0 * np.cos(np.radians(model_data['lat_grid']))
        
        # Calculate frame drag effect (simplified model)
        # Frame drag is stronger near equator and weaker near poles
        frame_drag_coef = self.model_params['frame_drag_coefficient']
        model_data['frame_drag_factor'] = frame_drag_coef * (model_data['rot_velocity'] / 465.0)
        
        # Calculate vortex strength based on rotation and gravity
        model_data['vortex_strength'] = model_data['frame_drag_factor'] * np.abs(model_data['bouguer_anomaly']) / 100.0
        
        # Store the vortex map for later use
        self.vortex_map = model_data[['lat_grid', 'lon_grid', 'vortex_strength']]
        
        # Visualize the vortex map
        plt.figure(figsize=(12, 8))
        scatter = plt.scatter(
            model_data['lon_grid'], 
            model_data['lat_grid'],
            c=model_data['vortex_strength'],
            cmap='plasma',
            s=50,
            alpha=0.7
        )
        plt.colorbar(scatter, label='Vortex Strength (arbitrary units)')
        plt.title('Layer 1: Spacetime Vortex Mapping')
        plt.xlabel('Longitude')
        plt.ylabel('Latitude')
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        plt.savefig(os.path.join(VISUALIZATION_DIR, 'layer1_vortex_map.png'), dpi=300)
        plt.close()
        
        # Save the layer 1 data
        model_data.to_csv(os.path.join(MODEL_DIR, 'layer1_frame_drag_data.csv'), index=False)
        
        print("Layer 1 implementation complete.")
        return model_data
    
    def implement_layer2_spin_phase_dynamics(self, layer1_data):
        """
        Implement Layer 2: Spin-Phase Dynamics (Berry phase/coherence vs spin alignment)
        
        This layer models quantum mechanical effects on spin alignment and phase coherence
        that may influence the coupling between magnetic and gravitational fields.
        """
        print("Implementing Layer 2: Spin-Phase Dynamics...")
        
        if layer1_data is None:
            print("Error: Layer 1 data not available.")
            return False
        
        # Create a copy of layer 1 data for model calculations
        model_data = layer1_data.copy()
        
        # Calculate Berry phase factor based on magnetic field and vortex strength
        # This is a simplified model of quantum phase effects
        berry_factor = self.model_params['berry_phase_factor']
        model_data['berry_phase'] = berry_factor * np.sin(np.radians(model_data['lat_grid'])) * model_data['magnetic_anomaly'] / 50.0
        
        # Calculate spin alignment factor
        # Higher values indicate better alignment between spins
        model_data['spin_alignment'] = 0.5 + 0.5 * np.tanh(model_data['magnetic_anomaly'] / 100.0)
        
        # Calculate phase coherence as a function of spin alignment and Berry phase
        model_data['phase_coherence'] = model_data['spin_alignment'] * (1 + 0.5 * model_data['berry_phase'])
        
        # Modulate vortex strength by phase coherence
        model_data['modulated_vortex'] = model_data['vortex_strength'] * model_data['phase_coherence']
        
        # Store the spin-phase coherence map for later use
        self.spin_phase_coherence = model_data[['lat_grid', 'lon_grid', 'phase_coherence']]
        
        # Visualize the spin-phase coherence map
        plt.figure(figsize=(12, 8))
        scatter = plt.scatter(
            model_data['lon_grid'], 
            model_data['lat_grid'],
            c=model_data['phase_coherence'],
            cmap='viridis',
            s=50,
            alpha=0.7
        )
        plt.colorbar(scatter, label='Phase Coherence (arbitrary units)')
        plt.title('Layer 2: Spin-Phase Coherence')
        plt.xlabel('Longitude')
        plt.ylabel('Latitude')
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        plt.savefig(os.path.join(VISUALIZATION_DIR, 'layer2_phase_coherence.png'), dpi=300)
        plt.close()
        
        # Save the layer 2 data
        model_data.to_csv(os.path.join(MODEL_DIR, 'layer2_spin_phase_data.csv'), index=False)
        
        print("Layer 2 implementation complete.")
        return model_data
    
    def implement_layer3_earthfield_coupling(self, layer2_data):
        """
        Implement Layer 3: Earthfield Coupling (SR resonance + magneto-gravity feedback)
        
        This layer models how Schumann Resonance modulates the coupling between
        magnetic field fluctuations and gravity anomalies.
        """
        print("Implementing Layer 3: Earthfield Coupling...")
        
        if layer2_data is None:
            print("Error: Layer 2 data not available.")
            return False
        
        if self.time_series is None:
            print("Error: Time series data not available.")
            return False
        
        # Create a copy of layer 2 data for model calculations
        model_data = layer2_data.copy()
        
        # Calculate base coupling strength between magnetic and gravity fields
        coupling_strength = self.model_params['coupling_strength']
        model_data['base_coupling'] = coupling_strength * np.abs(
            model_data['magnetic_anomaly'] * model_data['bouguer_anomaly']
        ) / 5000.0
        
        # Modulate coupling by phase coherence from Layer 2
        model_data['coherence_coupling'] = model_data['base_coupling'] * model_data['phase_coherence']
        
        # Calculate SR resonance factor from time series
        # For demonstration, we'll use the mean SR amplitude
        mean_sr = self.time_series['sr_amplitude'].mean()
        sr_factor = self.model_params['resonance_factor']
        
        # Apply SR modulation to coupling
        model_data['sr_modulation'] = 1.0 + sr_factor * (
            model_data['sr_intensity'] / mean_sr - 1.0
        )
        
        # Calculate final magneto-gravity coupling with SR modulation
        model_data['magneto_gravity_coupling'] = model_data['coherence_coupling'] * model_data['sr_modulation']
        
        # Store the earthfield coupling map for later use
        self.resonance_coupling = model_data[['lat_grid', 'lon_grid', 'magneto_gravity_coupling']]
        
        # Visualize the earthfield coupling map
        plt.figure(figsize=(12, 8))
        scatter = plt.scatter(
            model_data['lon_grid'], 
            model_data['lat_grid'],
            c=model_data['magneto_gravity_coupling'],
            cmap='magma',
            s=50,
            alpha=0.7
        )
        plt.colorbar(scatter, label='Magneto-Gravity Coupling (arbitrary units)')
        plt.title('Layer 3: Earthfield Coupling (SR + Magneto-Gravity Feedback)')
        plt.xlabel('Longitude')
        plt.ylabel('Latitude')
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        plt.savefig(os.path.join(VISUALIZATION_DIR, 'layer3_earthfield_coupling.png'), dpi=300)
        plt.close()
        
        # Save the layer 3 data
        model_data.to_csv(os.path.join(MODEL_DIR, 'layer3_earthfield_coupling_data.csv'), index=False)
        
        print("Layer 3 implementation complete.")
        return model_data
    
    def create_integrated_model_visualization(self, final_model_data):
        """Create integrated visualization of the complete Tesla-GRAVEM model."""
        print("Creating integrated model visualization...")
        
        if final_model_data is None:
            print("Error: Final model data not available.")
            return False
        
        # Create a figure with four subplots (2x2 grid)
        fig, axes = plt.subplots(2, 2, figsize=(18, 16))
        
        # Plot 1: Original Gravity Anomaly (top left)
        sc1 = axes[0, 0].scatter(
            final_model_data['lon_grid'], 
            final_model_data['lat_grid'],
            c=final_model_data['bouguer_anomaly'],
            cmap='viridis',
            s=40,
            alpha=0.7
        )
        axes[0, 0].set_title('Original Bouguer Gravity Anomaly (mGal)')
        axes[0, 0].set_xlabel('Longitude')
        axes[0, 0].set_ylabel('Latitude')
        plt.colorbar(sc1, ax=axes[0, 0])
        axes[0, 0].grid(True, alpha=0.3)
        
        # Plot 2: Layer 1 - Vortex Strength (top right)
        sc2 = axes[0, 1].scatter(
            final_model_data['lon_grid'], 
            final_model_data['lat_grid'],
            c=final_model_data['vortex_strength'],
            cmap='plasma',
            s=40,
            alpha=0.7
        )
        axes[0, 1].set_title('Layer 1: Spacetime Vortex Strength')
        axes[0, 1].set_xlabel('Longitude')
        axes[0, 1].set_ylabel('Latitude')
        plt.colorbar(sc2, ax=axes[0, 1])
        axes[0, 1].grid(True, alpha=0.3)
        
        # Plot 3: Layer 2 - Phase Coherence (bottom left)
        sc3 = axes[1, 0].scatter(
            final_model_data['lon_grid'], 
            final_model_data['lat_grid'],
            c=final_model_data['phase_coherence'],
            cmap='viridis',
            s=40,
            alpha=0.7
        )
        axes[1, 0].set_title('Layer 2: Spin-Phase Coherence')
        axes[1, 0].set_xlabel('Longitude')
        axes[1, 0].set_ylabel('Latitude')
        plt.colorbar(sc3, ax=axes[1, 0])
        axes[1, 0].grid(True, alpha=0.3)
        
        # Plot 4: Layer 3 - Magneto-Gravity Coupling (bottom right)
        sc4 = axes[1, 1].scatter(
            final_model_data['lon_grid'], 
            final_model_data['lat_grid'],
            c=final_model_data['magneto_gravity_coupling'],
            cmap='magma',
            s=40,
            alpha=0.7
        )
        axes[1, 1].set_title('Layer 3: Magneto-Gravity Coupling')
        axes[1, 1].set_xlabel('Longitude')
        axes[1, 1].set_ylabel('Latitude')
        plt.colorbar(sc4, ax=axes[1, 1])
        axes[1, 1].grid(True, alpha=0.3)
        
        plt.tight_layout()
        plt.savefig(os.path.join(VISUALIZATION_DIR, 'tesla_gravem_integrated_model.png'), dpi=300)
        plt.close()
        
        # Create a 3D visualization of the model
        self.create_3d_model_visualization(final_model_data)
        
        print("Integrated model visualization complete.")
        return True
    
    def create_3d_model_visualization(self, final_model_data):
        """Create a 3D visualization of the Tesla-GRAVEM model."""
        print("Creating 3D model visualization...")
        
        # Create a figure for 3D plot
        fig = plt.figure(figsize=(14, 12))
        ax = fig.add_subplot(111, projection='3d')
        
        # Extract coordinates and values
        x = final_model_data['lon_grid']
        y = final_model_data['lat_grid']
        z1 = final_model_data['bouguer_anomaly']
        z2 = final_model_data['magneto_gravity_coupling'] * 100  # Scale for visibility
        
        # Create 3D scatter plot
        scatter = ax.scatter(
            x, y, z1,
            c=z2,
            cmap='magma',
            s=40,
            alpha=0.7
        )
        
        # Add colorbar and labels
        cbar = plt.colorbar(scatter, ax=ax, pad=0.1)
        cbar.set_label('Magneto-Gravity Coupling (scaled)')
        
        ax.set_xlabel('Longitude')
        ax.set_ylabel('Latitude')
        ax.set_zlabel('Gravity Anomaly (mGal)')
        ax.set_title('3D Tesla-GRAVEM Model: Gravity Anomalies Modulated by Coupling')
        
        # Save the figure
        plt.tight_layout()
        plt.savefig(os.path.join(VISUALIZATION_DIR, 'tesla_gravem_3d_model.png'), dpi=300)
        plt.close()
        
        print("3D model visualization complete.")
        return True
    
 
(Content truncated due to size limit. Use line ranges to read in chunks)