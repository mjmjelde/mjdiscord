export interface GunInfo {
  name: string,
  image: string,
  attachments: string[][];
}

export const primaryGuns: GunInfo[] = [
  {
    name: 'Kilo 141',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/b/bf/Kilo_141_menu_icon_MW.png/revision/latest?cb=20200205144946',
    attachments: [
      ['Flash Guard', 'Tactical Suppressor', 'Breacher Device', 'Muzzle Brake', 'Lightweight Suppressor', 'Compensator', 'Monolithic Suppressor'],
      ['Singuard Arms 16.6" SOCOM', 'Singuard Arms 19.8" Prowler', 'Singuard Arms Whisper'],
      ['1mW Laser', '5mW Laser', 'Tac Laser'],
      ['Operator Reflex Sight', 'Corp Combat Holo Sight', 'Aim-Op Reflex Sight', 'G.I. Mini Reflex', 'Scout Combat Optic', 'APX5 Holographic Sight', 'Cronen LP945 Mini Reflex', '4.0 Flip Hybrid', 'VLK 3.0x Optic', 'Integral Hybrid', 'Viper Reflex Sight', 'Cronen C480 Pro Optic', 'Solozero NVG Enhanced', 'Monocle Reflex Sight', 'Sniper Scope', 'Merc Thermal Optic', 'PBX Holo 7 Sight', 'Thermal Hybrid', 'Solozero Optics Mini Reflex', 'Canted Hybrid', 'Variable Zoom Scope'],
      ['FORGE Tac Ultralight', 'Singuard Arms Sniper Pro', 'No Stock', 'FSS Close Quarters Stock'],
      ['Granulated Grip Tape', 'Rubberized Grip Tape', 'Stippled Grip Tape'],
      ['50 Round Mags ', '60 Round Mags ', '100 Round Drums '],
      ['Commando Foregrip', 'M203 40mm Concussive', 'Merc Foregrip', 'M203 40mm Smokescreen', '12-Gauge Deputy', 'M203 40mm Recon', 'M203 40mm High-explosive', 'M203 40mm Flash', 'Tactical Foregrip', 'M203 40mm Incendiary', 'Operator Foregrip', 'Ranger Foregrip', 'Bipod'],
      ['FMJ', 'Heavy Hitter', 'Recon (Lv 11)', 'Frangible - Wounding', 'Mo\' Money', 'Fully Loaded', 'Sleight of Hand', 'Fast Melee', 'Burst', 'Frangible - Disabling', 'Presence of Mind']
    ]
  },
  {
    name: 'FAL',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/8/83/FAL_menu_icon_MW2.png/revision/latest?cb=20120118220357',
    attachments: [
      ["Muzzle Brake", "Flash Guard", "Tactical Suppressor", "Lightweight Suppressor", "Compensator", "Monolithic Suppressor"],
      ["18.0\" Ultralight", "XRK Marksman", "13.0\" OSW Para"],
      ["5mW Laser", "1mW Laser", "Tac Laser"],
      [
        "G.I. Mini Reflex",
        "Corp Combat Holo Sight",
        "Aim-Op Reflex Sight",
        "Scout Combat Optic",
        "APX5 Holographic Sight",
        "4.0 Flip Hybrid",
        "Solozero Optics Mini Reflex",
        "VLK 3.0x Optic",
        "Operator Reflex Sight",
        "Sniper Scope",
        "Solozero NVG Enhanced",
        "Integral Hybrid",
        "Viper Reflex Sight",
        "PBX Holo 7 Sight",
        "Monocle Reflex Sight",
        "Canted Hybrid",
        "Variable Zoom Scope",
        "Cronen C480 Pro Optic",
        "Cronen LP945 Mini Reflex",
        "Merc Thermal Optic",
        "Thermal Hybrid"
      ],
      [
        "Factory 18\" Aluminum Stock",
        "No Stock",
        "FSS Close Quarters Stock",
        "FORGE TAC Stalker"
      ],
      [
        "Granulated Grip Tape",
        "Stippled Grip Tape",
        "Rubberized Grip Tape"
      ],
      [
        "24 Round Mags",
        "30 Round Mags"
      ],
      [
        "Commando Foregrip",
        "Merc Foregrip",
        "12-Gauge Deputy",
        "Bipod",
        "M203 40mm Recon",
        "M203 40mm High-explosive",
        "Ranger Foregrip",
        "M203 40mm Flash",
        "M203 40mm Smokescreen",
        "Tactical Foregrip",
        "M203 40mm Incendiary",
        "M203 40mm Concussive",
        "Operator Foregrip"
      ],
      [
        "Heavy Hitter",
        "Recon",
        "Frangible - Wounding",
        "FMJ",
        "Sleight of Hand",
        "Fast Melee",
        "Frangible - Disabling",
        "Fully Loaded",
        "Burst",
        "Mo' Money",
        "Presence of Mind"
      ]
    ]
  },
  {
    name: 'M4A1',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/b/b2/M4_Carbine_Menu_Icon_MWR.png/revision/latest/scale-to-width-down/350?cb=20170309003219',
    attachments: [
      [
        "Flash Guard",
        "Breacher Device",
        "Tactical Suppressor",
        "Muzzle Brake",
        "Lightweight Suppressor",
        "Compensator",
        "Monolithic Suppressor"
      ],
      [
        "FSS 11.5\" Commando",
        "Stock M16 Grenadier",
        "FSS 14.5\" Tac Lite",
        "Corvus Custom Marksman",
        "FSS 12.4\" Predator"
      ],
      [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      [
        "Cronen LP945 Mini Reflex",
        "Corp Combat Holo Sight",
        "Operator Reflex Sight",
        "Scout Combat Optic",
        "4.0 Flip Hybrid",
        "Aim-Op Reflex Sight",
        "APX5 Holographic Sight",
        "Integral Hybrid",
        "Solozero NVG Enhanced",
        "VLK 3.0x Optic",
        "Sniper Scope",
        "Viper Reflex Sight",
        "G.I. Mini Reflex",
        "PBX Holo 7 Sight",
        "Cronen C480 Pro Optic",
        "Monocle Reflex Sight",
        "Variable Zoom Scope",
        "Canted Hybrid",
        "Merc Thermal Optic",
        "Thermal Hybrid"
      ],
      [
        "M-16 Stock",
        "Singuard Arms Invader",
        "No Stock",
        "FORGE TAC CQS"
      ],
      [
        "Granulated Grip Tape",
        "Rubberized Grip Tape",
        "Stippled Grip Tape"
      ],
      [
        "50 Round Mags",
        "60 Round Mags",
        "9mm Para 32-Round Mags",
        ".458 SOCOM 10-Round Mags"
      ],
      [
        "Commando Foregrip",
        "M203 40mm High-explosive",
        "M203 40mm Incendiary",
        "12-Gauge Deputy",
        "Merc Foregrip",
        "M203 40mm Smokescreen",
        "Tactical Foregrip",
        "M203 40mm Recon",
        "Bipod",
        "M203 40mm Flash",
        "Ranger Foregrip",
        "M203 40mm Concussive",
        "Operator Foregrip"
      ],
      [
        "FMJ",
        "Sleight of Hand",
        "Frangible - Wounding",
        "Heavy Hitter",
        "Fully Loaded",
        "Burst",
        "Recon",
        "Mo' Money",
        "Fast Melee",
        "Frangible - Disabling",
        "Presence of Mind"
      ]
    ]
  },
  {
    name: 'FR 5.56',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/7/77/FR_556_menu_icon_MW.png/revision/latest/scale-to-width-down/350?cb=20191114145241',
    attachments: [
      [
        "Flash Guard",
        "Muzzle Brake",
        "Tactical Suppressor",
        "Compensator",
        "Lightweight Suppressor",
        "Monolithic Suppressor"
      ],
      [
        "FR 15.9\" Commando",
        "FR 24.4\" Sniper",
        "FORGE TAC Ultralight"
      ],
      [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      [
        "Operator Reflex Sight",
        "Corp Combat Holo Sight",
        "Aim-Op Reflex Sight",
        "Scout Combat Optic",
        "APX5 Holographic Sight",
        "Integral Hybrid",
        "Solozero Optics Mini Reflex",
        "VLK 3.0x Optic",
        "4.0 Flip Hybrid",
        "Viper Reflex Sight",
        "PBX Holo 7 Sight",
        "Solozero NVG Enhanced",
        "Sniper Scope",
        "Cronen LP945 Mini Reflex",
        "Monocle Reflex Sight",
        "Cronen C480 Pro Optic",
        "G.I. Mini Reflex",
        "Variable Zoom Scope",
        "Thermal Hybrid",
        "Merc Thermal Optic",
        "Canted Hybrid"
      ],
      [
        "FR Ultralight Hollow",
        "FORGE TAC Ballast Pack",
        "FSS Tac-Wrap"
      ],
      [
        "Stippled Grip Tape",
        "Granulated Grip Tape",
        "Rubberized Grip Tape"
      ],
      [
        "50 Round Mags",
        "60 Round Mags"
      ],
      [
        "Commando Foregrip",
        "M203 40mm Smokescreen",
        "M203 40mm Incendiary",
        "Merc Foregrip",
        "M203 40mm High-explosive",
        "M203 40mm Concussive",
        "Tactical Foregrip",
        "Bipod",
        "M203 40mm Flash",
        "12-Gauge Deputy",
        "Operator Foregrip",
        "M203 40mm Recon",
        "Ranger Foregrip"
      ],
      [
        "Recon",
        "Heavy Hitter",
        "Frangible - Wounding",
        "Fully Loaded",
        "Fast Melee",
        "Mo' Money",
        "FMJ",
        "Sleight of Hand",
        "Frangible - Disabling",
        "Presence of Mind"
      ]
    ]
  },
  {
    name: 'Oden',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/c/c5/Oden_menu_icon_MW.png/revision/latest/scale-to-width-down/350?cb=20191114145345',
    attachments: [
      [
        "Flash Guard",
        "Tactical Suppressor",
        "CQB Breacher Device",
        "Colossus Suppressor",
        "Compensator",
        "Muzzle Brake",
        "Monolithic Suppressor"
      ],
      [
        "Oden Factory 810mm",
        "Oden Factory 730mm",
        "Oden Factory 420mm"
      ],
      [
        "5mW Laser",
        "1mW Laser",
        "Tac Laser"
      ],
      [
        "Operator Reflex Sight",
        "Corp Combat Holo Sight",
        "Solozero Optics Mini Reflex",
        "Aim-Op Reflex Sight",
        "APX5 Holographic Sight",
        "VLK 3.0x Optic",
        "Viper Reflex Sight",
        "Sniper Scope",
        "Solozero NVG Enhanced",
        "PBX Holo 7 Sight",
        "Monocle Reflex Sight",
        "G.I. Mini Reflex",
        "Integral Hybrid",
        "Scout Combat Optic",
        "Merc Thermal Optic",
        "Thermal Hybrid",
        "Cronen C480 Pro Optic",
        "Canted Hybrid",
        "Variable Zoom Scope",
        "Cronen LP945 Mini Reflex"
      ],
      [
        "FORGE TAC Ballast Pack",
        "Oden Ultralight Hollow",
        "FTAC XL Elite Comb"
      ],
      [
        "Stippled Grip Tape",
        "Granulated Grip Tape",
        "Rubberized Grip Tape"
      ],
      [
        "25 Round Mags",
        "30 Round Mags"
      ],
      [
        "Commando Foregrip",
        "M203 40mm Flash",
        "Merc Foregrip",
        "M203 40mm Concussive",
        "M203 40mm Smokescreen",
        "Bipod",
        "Tactical Foregrip",
        "Ranger Foregrip",
        "M203 40mm Incendiary",
        "M203 40mm High-explosive",
        "12-Gauge Deputy",
        "M203 40mm Recon",
        "Operator Foregrip"
      ],
      [
        "Fast Melee",
        "FMJ",
        "Recon",
        "Frangible - Wounding",
        "Sleight of Hand",
        "Heavy Hitter",
        "Mo' Money",
        "Frangible - Disabling",
        "Fully Loaded",
        "Burst Fire (x2)",
        "Presence of Mind"
      ]
    ]
  },
  {
    name: 'M13',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/5/54/M13_menu_icon_MW.png/revision/latest/scale-to-width-down/350?cb=20200529112013',
    attachments: [
      [
        "Tactical Suppressor",
        "Flash Guard",
        "Muzzle Brake",
        "Breacher Device",
        "Lightweight Suppressor",
        "Compensator (Lv. 50)",
        "Monolithic Suppressor (Lv. 60)"
      ],
      [
        "Tempus Mini",
        "Tempus Cyclone",
        "Tempus Marksman"
      ],
      [
        "1mW Laser",
        "Tac Laser",
        "5mW Laser"
      ],
      [
        "Solozero Optics Mini Reflex",
        "Aim-Op Reflex Sight",
        "Corp Combat Holo Sight",
        "Scout Combat Optic",
        "Operator Reflex Sight",
        "4.0 Flip Hybrid (Lv. 16)",
        "APX5 Holographic Sight",
        "Integral Hybrid",
        "G.I. Mini Reflex",
        "VLK 3.0x Optic",
        "Cronen LP945 Mini Reflex",
        "Viper Reflex Sight (Lv. 39)",
        "Sniper Scope (Lv. 43)",
        "Solozero NVG Enhanced (Lv. 45)",
        "Monocle Reflex Sight (Lv. 48)",
        "Cronen C480 Pro Optic (Lv. 51)",
        "Merc Thermal Optic (Lv. 55)",
        "Canted Hybrid (Lv. 58)",
        "PBX Holo 7 Sight (Lv. 63)",
        "Thermal Hybrid (Lv. 67)",
        "Variable Zoom Scope (Lv. 69)"
      ],
      [
        "FORGE TAC Stalker",
        "No Stock",
        "FSS Close Quarters Stock",
        "M13 Skeleton Stock"
      ],
      [
        "Granulated Grip Tape (Lv. 14)",
        "Stippled Grip Tape (Lv. 26)",
        "Rubberized Grip Tape (Lv. 61)"
      ],
      [
        "50 Round Mags",
        ".300 Blackout 30-Round Mags",
        "60 Round Mags (Lv. 53)"
      ],
      [
        "Merc Foregrip",
        "M203 40mm Smokescreen",
        "Commando Foregrip",
        "M203 40mm Incendiary",
        "M203 40mm Flash",
        "Bipod",
        "M203 40mm High-explosive",
        "Tactical Foregrip",
        "M203 40mm Concussive",
        "Ranger Foregrip",
        "M203 40mm Recon",
        "Operator Foregrip",
        "12-Gauge Deputy"
      ],
      [
        "Heavy Hitter",
        "Frangible - Wounding",
        "Fully Loaded",
        "Sleight of Hand",
        "Burst",
        "Mo' Money",
        "Fast Melee",
        "Frangible - Disabling",
        "Recon",
        "FMJ",
        "Presence of Mind"
      ]
    ]
  },
  {
    name: 'FN Scar 17',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/8/88/FN_Scar_17_menu_icon_MW.png/revision/latest/scale-to-width-down/350?cb=20191114145619',
    attachments: [
      [
        "Flash Guard",
        "Tactical Suppressor",
        "Muzzle Brake",
        "Lightweight Suppressor",
        "Breacher Device",
        "Compensator",
        "Monolithic Suppressor"
      ],
      [
        "FORGE TAC 17.2\" LB",
        "FORGE TAC 20.0\" LB",
        "FORGE TAC CQC Pro"
      ],
      [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      [
        "Operator Reflex Sight",
        "Corp Combat Holo Sight",
        "G.I. Mini Reflex",
        "4.0 Flip Hybrid",
        "APX5 Holographic Sight",
        "Scout Combat Optic",
        "Aim-Op Reflex Sight",
        "VLK 3.0x Optic",
        "Thermal Hybrid",
        "Solozero Optics Mini Reflex",
        "Sniper Scope",
        "Viper Reflex Sight",
        "PBX Holo 7 Sight",
        "Cronen C480 Pro Optic",
        "Solozero NVG Enhanced",
        "Monocle Reflex Sight",
        "Cronen LP945 Mini Reflex",
        "Merc Thermal Optic",
        "Integral Hybrid",
        "Variable Zoom Scope",
        "Canted Hybrid"
      ],
      [
        "FTAC Hunter",
        "FTAC Collapsible Stock",
        "FSS Close Quarters Stock",
        "XRK Obelisk Pro"
      ],
      [
        "Stippled Grip Tape",
        "Granulated Grip Tape",
        "Rubberized Grip Tape"
      ],
      [
        "25 Round Mags",
        "30 Round Mags"
      ],
      [
        "Commando Foregrip",
        "40mm Concussive (FN EGLM)",
        "Merc Foregrip",
        "40mm High-explosive",
        "40mm Incendiary",
        "40mm Flash",
        "Tactical Foregrip",
        "40mm Smokescreen",
        "12-Gauge Deputy",
        "Bipod Foregrip",
        "40mm Recon",
        "Operator Foregrip"
      ],
      [
        "Fast Melee",
        "Fully Loaded",
        "Frangible - Wounding",
        "Sleight of Hand",
        "Recon",
        "Mo' Money",
        "Heavy Hitter",
        "Frangible - Disabling",
        "FMJ"
      ]
    ]
  },
  {
    name: 'AK-47',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/4/4a/AK-47_menu_icon_MW.png/revision/latest/scale-to-width-down/350?cb=20200316102034',
    attachments: [
      [
        "Flash Guard",
        "Muzzle Brake",
        "Tactical Suppressor",
        "Compensator",
        "Lightweight Suppressor",
        "Bayonet",
        "Monolithic Suppressor",
        "Oil Can Suppressor (campaign only)"
      ],
      [
        "Spetsnaz Elite",
        "23.0\" RPK Barrel",
        "8.1\" Compact Barrel",
        "23.0\" Romanian"
      ],
      [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      [
        "Operator Reflex Sight",
        "Corp Combat Holo Sight",
        "Aim-Op Reflex Sight",
        "Scout Combat Optic",
        "APX5 Holographic Sight",
        "Solozero Optics Mini Reflex",
        "Integral Hybrid",
        "VLK 3.0x Optic",
        "Sniper Scope",
        "Viper Reflex Sight",
        "G.I. Mini Reflex",
        "Solozero NVG Enhanced",
        "Monocle Reflex Sight",
        "Cronen LP945 Mini Reflex",
        "Canted Hybrid",
        "Cronen C480 Pro Optic",
        "Merc Thermal Optic",
        "Variable Zoom Scope",
        "Thermal Hybrid"
      ],
      [
        "Field LMG Stock",
        "Skeleton Stock",
        "No Stock",
        "FSS Close Quarters Stock",
        "FORGE TAC Ultralight"
      ],
      [
        "Granulated Grip Tape",
        "Stippled Grip Tape",
        "Rubberized Grip Tape"
      ],
      [
        "40 Round Mags",
        "5.45×39mm 30-Round Mags",
        "75 Round Drum Mags"
      ],
      [
        "Bipod",
        "Commando Foregrip",
        "GP25 40mm High-explosive",
        "Merc Foregrip",
        "GP25 40mm Smokescreen",
        "GP25 40mm Incendiary",
        "Tactical Foregrip",
        "GP25 40mm Concussive",
        "Operator Foregrip",
        "Ranger Foregrip",
        "GP25 40mm Flash",
        "12-Gauge Deputy",
        "GP25 40mm Recon"
      ],
      [
        "Fast Melee",
        "Fully Loaded",
        "Frangible - Wounding",
        "Sleight of Hand",
        "Recon",
        "Mo' Money",
        "Frangible - Disabling",
        "Heavy Hitter",
        "FMJ",
        "Presence of Mind"
      ]
    ]
  },
  {
    name: 'RAM-7',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/f/fa/RAM-7_model_MW.png/revision/latest/scale-to-width-down/350?cb=20200125022341',
    attachments: [
      [
        "Flash Guard",
        "Breacher Device",
        "Tactical Suppressor",
        "Muzzle Brake",
        "Lightweight Suppressor",
        "Compensator",
        "Monolithic Suppressor"
      ],
      [
        "FTAC 13.5\" Compact",
        "FORGE TAC Eclipse",
        "FSS Ranger"
      ],
      [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      [
        "Cronen LP945 Mini Reflex",
        "Corp Combat Holo Sight",
        "Operator Reflex Sight",
        "Scout Combat Optic",
        "4.0 Flip Hybrid",
        "Aim-Op Reflex Sight",
        "APX5 Holographic Sight",
        "Integral Hybrid",
        "Solozero NVG Enhanced",
        "VLK 3.0x Optic",
        "Sniper Scope",
        "Viper Reflex Sight",
        "G.I. Mini Reflex",
        "PBX Holo 7 Sight",
        "Cronen 2x2 Elite",
        "Monocle Reflex Sight",
        "Variable Zoom Scope",
        "Canted Hybrid",
        "Merc Thermal Optic",
        "Thermal Hybrid"
      ],
      [
        "FTAC Equilibrium",
        "XRK Ultralight Hollow",
        "XRK Close Quarters Stock"
      ],
      [
        "Granulated Grip Tape",
        "Rubberized Grip Tape",
        "Stippled Grip Tape"
      ],
      [
        "50 Round Mags"
      ],
      [
        "Commando Foregrip",
        "M203 40mm High-explosive",
        "M203 40mm Incendiary",
        "12-Gauge Deputy",
        "Merc Foregrip",
        "M203 40mm Smokescreen",
        "Tactical Foregrip",
        "M203 40mm Recon",
        "M203 40mm Flash",
        "Ranger Foregrip",
        "M203 40mm Concussive",
        "Operator Foregrip"
      ],
      [
        "FMJ",
        "Sleight of Hand",
        "Frangible - Wounding",
        "Heavy Hitter",
        "Fully Loaded",
        "Burst",
        "Recon",
        "Mo' Money",
        "Fast Melee",
        "Frangible - Disabling",
        "Presence of Mind"
      ]
    ]
  },
  {
    name: 'Grau 5.56',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/2/2d/Grau_5.56_menu_icon_MW.png/revision/latest/scale-to-width-down/350?cb=20200519032943',
    attachments: [
      [
        "Flash Guard",
        "Breacher Device",
        "Tactical Suppressor",
        "Muzzle Brake",
        "Lightweight Suppressor",
        "Compensator",
        "Monolithic Suppressor"
      ],
      [
        "ZLR Drifter A-08",
        "Tempus 26.4\" Archangel",
        "XRK CZEN mk2",
        "FSS 20.8\" Nexus"
      ],
      [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      [
        "Cronen LP945 Mini Reflex",
        "Corp Combat Holo Sight",
        "Operator Reflex Sight",
        "Scout Combat Optic",
        "4.0 Flip Hybrid",
        "Aim-Op Reflex Sight",
        "APX5 Holographic Sight",
        "Integral Hybrid",
        "Solozero NVG Enhanced",
        "VLK 3.0x Optic",
        "Sniper Scope",
        "Viper Reflex Sight",
        "G.I. Mini Reflex",
        "PBX Holo 7 Sight",
        "Cronen C480 Pro Optic",
        "Monocle Reflex Sight",
        "Variable Zoom Scope",
        "Canted Hybrid",
        "Merc Thermal Optic",
        "Thermal Hybrid"
      ],
      [
        "FSS Blackjack",
        "XRK StrikeLite III",
        "No Stock"
      ],
      [
        "XRK Void II",
        "Cronen Sniper Elite",
        "FTAC R-89 Rubber"
      ],
      [
        "50 Round Mags",
        "60 Round Mags"
      ],
      [
        "Commando Foregrip",
        "M203 40mm High-explosive",
        "M203 40mm Incendiary",
        "12-Gauge Deputy",
        "Merc Foregrip",
        "M203 40mm Smokescreen",
        "Cronen Shark II",
        "M203 40mm Recon",
        "M203 40mm Flash",
        "Ranger Foregrip",
        "M203 40mm Concussive",
        "Operator Foregrip"
      ],
      [
        "FMJ",
        "Sleight of Hand",
        "Frangible - Wounding",
        "Heavy Hitter",
        "Fully Loaded",
        "Burst",
        "Recon",
        "Mo' Money",
        "Fast Melee",
        "Frangible - Disabling",
        "Presence of Mind"
      ]
    ]
  },
  {
    name: 'CR-56 AMAX',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/3/33/CR-56_AMAX_model_MW.png/revision/latest/scale-to-width-down/350?cb=20200611101913',
    attachments: [
      [
        "Muzzle Brake",
        "Flash Guard",
        "Tactical Suppressor",
        "Lightweight Suppressor",
        "Compensator",
        "Monolithic Suppressor"
      ],
      [
        "FSS 8.3\" Intruder",
        "XRK Zodiac S440",
        "FSS 11.8\" Squall"
      ],
      [
        "5mW Laser",
        "1mW Laser",
        "Tac Laser"
      ],
      [
        "G.I. Mini Reflex",
        "Corp Combat Holo Sight",
        "Aim-Op Reflex Sight",
        "Scout Combat Optic",
        "APX5 Holographic Sight",
        "4.0 Flip Hybrid",
        "Solozero Optics Mini Reflex",
        "VLK 3.0x Optic",
        "Operator Reflex Sight",
        "Sniper Scope​​​​​​​",
        "Solozero NVG Enhanced​​​​​​​",
        "Integral Hybrid​​​​​​​",
        "Viper Reflex Sight​​​​​​​",
        "PBX Holo 7 Sight​​​​​​​",
        "Monocle Reflex Sight​​​​​​​",
        "Canted Hybrid​​​​​​​",
        "Variable Zoom Scope​​​​​​​",
        "Cronen C480 Pro Optic​​​​​​​",
        "Cronen LP945 Mini Reflex​​​​​​​",
        "Merc Thermal Optic​​​​​​​",
        "Thermal Hybrid​​​​​​​"
      ],
      [
        "FSS Close Quarters Stock",
        "FTAC Hunter",
        "No Stock",
        "FTAC Spartan",
        "XRK Gatekeeper​​​​​​​",
        "CR-56 EXO"
      ],
      [
        "XRK CR-56 Granulated Wrap​​​​​​​​​​​​​​",
        "XRK CR-56 Stippled Wrap​​​​​​​",
        "XRK CR-56 Rubberized Wrap"
      ],
      [
        "45 Round Mags",
        "M67 10-R Mags"
      ],
      [
        "Commando Foregrip",
        "Merc Foregrip",
        "12-Gauge Deputy​​​​​​​",
        "Bipod​​​​​​​",
        "M203 40mm Recon​​​​​​​",
        "M203 40mm Concussive​​​​​​​",
        "Ranger Foregrip​​​​​​​",
        "M203 40mm Flash​​​​​​​",
        "M203 40mm Smokescreen​​​​​​​",
        "Tactical Foregrip​​​​​​​",
        "M203 40mm Incendiary​​​​​​​",
        "M203 40mm High-explosive​​​​​​​",
        "Operator Foregrip​​​​​​​"
      ],
      [
        "Heavy Hitter",
        "Recon​​​​​​​",
        "Frangible - Wounding​​​​​​​",
        "FMJ​​​​​​​",
        "Sleight of Hand​​​​​​​",
        "Fast Melee​​​​​​​",
        "Frangible - Disabling​​​​​​​",
        "Fully Loaded​​​​​​​",
        "Mo' Money​​​​​​​",
        "Presence of Mind​​​​​​​"
      ]
    ]
  },
  {
    name: 'AUG',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/6/64/AUG_Gunsmith_Preview_MW.png/revision/latest/scale-to-width-down/350?cb=20191119015709',
    attachments: [
      [
        "CQB Breacher Device",
        "Tactical Suppressor",
        "Flash Guard",
        "Monolithic Suppressor",
        "Muzzle Brake",
        "Compensator",
        "Lightweight Suppressor"
      ],
      [
        "407mm Extended Barrel",
        "407mm Lightweight",
        "622mm Long Barrel"
      ],
      [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      [
        "Operator Reflex Sight",
        "Corp Combat Holo Sight",
        "Aim-Op Reflex Sight",
        "G.I. Mini Reflex",
        "Scout Combat Optic",
        "APX5 Holographic Sight",
        "Solozero Optics Mini Reflex",
        "VLK 3.0x Optic",
        "Thermal Hybrid",
        "Viper Reflex Sight",
        "PBX Holo 7 Sight",
        "Solozero NVG Enhanced",
        "Cronen LP945 Mini Reflex",
        "4.0 Flip Hybrid",
        "Monocle Reflex Sight",
        "Integral 3.0x Optic",
        "Cronen C480 Pro Optic",
        "Merc Thermal Optic",
        "Integral Hybrid"
      ],
      [
        "FTAC Ultralight Hollow",
        "FORGE TAC CQB Comb",
        "FSS Heavy Stock Pro"
      ],
      [
        "Granulated Grip Tape",
        "Rubberized Grip Tape",
        "Stippled Grip Tape"
      ],
      [
        "32 Round Mags",
        "5.56 NATO 30-Round Mags",
        "5.56 NATO 60-Round Drums"
      ],
      [
        "Merc Foregrip",
        "Commando Foregrip",
        "Tactical Foregrip",
        "Ranger Foregrip",
        "Operator Foregrip"
      ],
      [
        "FMJ",
        "Heavy Hitter",
        "Recon",
        "Frangible - Wounding",
        "Sleight of Hand",
        "Fully Loaded",
        "Mo' Money",
        "Frangible - Disabling",
        "Fast Melee",
        "Burst"
      ]
    ]
  },
  {
    name: 'P90',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/8/8f/P90_Gunsmith_Preview_MW.png/revision/latest/scale-to-width-down/350?cb=20191119190035',
    attachments: [
      [
        "Flash Guard",
        "Muzzle Brake",
        "Breacher Device",
        "Lightweight Suppressor",
        "Monolithic Suppressor",
        "Compensator",
        "Tactical Suppressor"
      ],
      [
        "FORGE TAC Retribution",
        "FSS 10.6\" Pro"
      ],
      [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      [
        "Solozero Optics Mini Reflex",
        "Operator Reflex Sight",
        "Corp Combat Holo Sight",
        "Viper Reflex Sight",
        "G.I. Mini Reflex",
        "Scout Combat Optic",
        "APX5 Holographic Sight",
        "Cronen LP945 Mini Reflex",
        "FSS Ring Sight",
        "VLK 3.0x Optic",
        "Solozero NVG Enhanced",
        "Integral Hybrid",
        "Monocle Reflex Sight",
        "PBX Holo 7 Sight",
        "Cronen C480 Pro Optic",
        "Canted Hybrid",
        "Aim-Op Reflex Sight",
        "Thermal Hybrid",
        "Merc Thermal Optic"
      ],
      [
        "FORGE TAC CQB Comb",
        "Fly Strap",
        "FSS Heavy Stock Pro"
      ],
      [
        "Stippled Grip Tape",
        "Granulated Grip Tape",
        "Rubberized Grip Tape"
      ],
      [
        "Granulated Grip Tape",
        "Stippled Grip Tape",
        "Rubberized Grip Tape"
      ],
      [
        "Frangible - Wounding",
        "Heavy Hitter",
        "FMJ",
        "Fully Loaded",
        "Frangible - Disabling",
        "Mo' Money",
        "Sleight of Hand",
        "Recon",
        "Fast Melee"
      ]
    ]
  },
  {
    name: 'MP5',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/e/e6/MP5_Gunsmith_Preview_MW.png/revision/latest/scale-to-width-down/350?cb=20191118193620',
    attachments: [
      [
        "Flash Guard",
        "Tactical Suppressor",
        "Muzzle Brake",
        "Monolithic Suppressor",
        "Lightweight Suppressor",
        "Breacher Device",
        "Compensator"
      ],
      [
        "FSS Light",
        "Monolithic Integral Suppressor",
        "FSS Mini",
        "Subsonic Integral Suppressor"
      ],
      [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      [
        "Operator Reflex Sight",
        "APX5 Holographic Sight",
        "Aim-Op Reflex Sight",
        "Solozero Optics Mini Reflex",
        "Corp Combat Holo Sight",
        "Solozero NVG Enhanced",
        "Scout Combat Optic",
        "G.I. Mini Reflex",
        "VLK 3.0x Optic",
        "Merc Thermal Optic",
        "Canted Hybrid",
        "Cronen LP945 Mini Reflex",
        "PBX Holo 7 Sight",
        "Viper Reflex Sight",
        "Cronen C480 Pro Optic",
        "Thermal Hybrid",
        "Integral Hybrid",
        "Monocle Reflex Sight"
      ],
      [
        "FORGE TAC Ultralight",
        "Classic Straight-line Stock",
        "FSS Close Quarters Stock",
        "FTAC Collapsible"
      ],
      [
        "Rubberized Grip Tape",
        "Granulated Grip Tape",
        "Stippled Grip Tape"
      ],
      [
        "45 Round Mags",
        "10mm Auto 30-Round Mags"
      ],
      [
        "Commando Foregrip",
        "Merc Foregrip",
        "Ranger Foregrip",
        "Tactical Foregrip",
        "Operator Foregrip"
      ],
      [
        "Frangible - Wounding",
        "Fast Melee",
        "Recon",
        "FMJ",
        "Mo' Money",
        "Sleight of Hand",
        "Fully Loaded",
        "Frangible - Disabling",
        "Burst",
        "Heavy Hitter"
      ]
    ]
  },
  {
    name: 'Uzi',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/0/0b/Uzi_Gunsmith_Preview_MW.png/revision/latest/scale-to-width-down/350?cb=20200418105335',
    attachments: [
      [
        "Flash Guard",
        "Muzzle Brake",
        "CQB Breacher Device",
        "Tactical Suppressor",
        "Monolithic Suppressor",
        "Lightweight Suppressor",
        "Compensator",
        "Oil Can Suppressor (campaign only)"
      ],
      [
        "13.1\" First Responder",
        "8.5\" Factory Mini",
        "16.5\" Factory Carbine",
        "FSS Carbine Pro"
      ],
      [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      [
        "Cronen LP945 Mini Reflex",
        "Operator Reflex Sight",
        "Corp Combat Holo Sight",
        "Viper Reflex Sight",
        "Solozero Optics Mini Reflex",
        "Scout Combat Optic",
        "APX5 Holographic Sight",
        "Integral Hybrid",
        "G.I. Mini Reflex",
        "Monocle Reflex Sight",
        "VLK 3.0x Optic",
        "Solozero NVG Enhanced",
        "Canted Hybrid",
        "Aim-Op Reflex Sight",
        "PBX Holo 7 Sight",
        "Thermal Hybrid",
        "Cronen C480 Pro Optic",
        "Merc Thermal Optic"
      ],
      [
        "FORGE TAC Ultralight",
        "Standard-Issue Wood Stock",
        "No Stock",
        "FSS Close Quarters Stock"
      ],
      [
        "Granulated Grip Tape",
        "Stippled Grip Tape",
        "Rubberized Grip Tape"
      ],
      [
        "40 Round Mags",
        "50 Round Mags",
        ".41 AE 32-Round Mags"
      ],
      [
        "Merc Foregrip",
        "Commando Foregrip",
        "Operator Foregrip",
        "Tactical Foregrip",
        "Ranger Foregrip"
      ],
      [
        "Heavy Hitter",
        "Frangible - Wounding",
        "Recon",
        "FMJ",
        "Fully Loaded",
        "Frangible - Disabling",
        "Mo' Money",
        "Sleight of Hand",
        "Fast Melee"
      ]
    ]
  },
  {
    name: 'PP19 Bizon',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/3/31/PP19_Bizon_Gunsmith_Preview_MW.png/revision/latest/scale-to-width-down/350?cb=20191119015013',
    attachments: [
      [
        "Tactical Suppressor",
        "Flash Guard",
        "Muzzle Brake",
        "Lightweight Suppressor",
        "CQB Breacher Device",
        "Compensator",
        "Monolithic Suppressor",
        "Oil Can Suppressor (campaign only)"
      ],
      [
        "8.7\" Steel",
        "8.7\" Polygonal",
        "8.7\" Aluminum"
      ],
      [
        "Tac Laser",
        "1mW Laser",
        "5mW Laser"
      ],
      [
        "Monocle Reflex Sight",
        "Corp Combat Holo Sight",
        "Aim-Op Reflex Sight",
        "Cronen C480 Pro Optic",
        "G.I. Mini Reflex",
        "APX5 Holographic Sight",
        "Operator Reflex Sight",
        "Solozero NVG Enhanced",
        "Solozero Optics Mini Reflex",
        "Merc Thermal Optic",
        "PBX Holo 7 Sight",
        "Thermal Hybrid",
        "Viper Reflex Sight",
        "Cronen LP945 Mini Reflex",
        "Scout Combat Optic",
        "Integral Hybrid",
        "Canted Hybrid",
        "VLK 3.0x Optic"
      ],
      [
        "Factory Aluminum Stock",
        "No Stock",
        "Corvus Skeleton Stock",
        "FSS Close Quarters Stock"
      ],
      [
        "Granulated Grip Tape",
        "Stippled Grip Tape",
        "Rubberized Grip Tape"
      ],
      [
        "84 Round Helical Mags"
      ],
      [
        "Sleight of Hand",
        "Fast Melee",
        "Recon",
        "FMJ",
        "Frangible - Wounding",
        "Mo' Money",
        "Frangible - Disabling",
        "Heavy Hitter",
        "Fully Loaded"
      ]
    ]
  },
  {
    name: 'MP7',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/f/f0/MP7_Menu_Icon_MW.png/revision/latest/scale-to-width-down/350?cb=20200418111222',
    attachments: [
      [
        "Flash Guard",
        "Tactical Suppressor",
        "Muzzle Brake",
        "Breacher Device",
        "Lightweight Suppressor",
        "Compensator",
        "Monolithic Suppressor",
        "Oil Can Suppressor (campaign only)"
      ],
      [
        "FSS STRIKE",
        "FSS RECON",
        "FSS SWAT"
      ],
      [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      [
        "Aim-Op Reflex Sight",
        "Corp Combat Holo Sight",
        "Operator Reflex Sight",
        "Cronen LP945 Mini Reflex",
        "VLK 3.0x Optic",
        "APX5 Holographic Sight",
        "G.I. Mini Reflex",
        "Scout Combat Optic",
        "Monocle Reflex Sight",
        "Solozero NVG Enhanced",
        "Viper Reflex Sight",
        "PBX Holo 7 Sight",
        "4.0 Flip Hybrid",
        "Solozero Optics Mini Reflex",
        "Merc Thermal Optic",
        "Cronen C480 Pro Optic",
        "Thermal Hybrid"
      ],
      [
        "FORGE TAC Ultralight",
        "FORGE TAC Stalker",
        "FSS Close Quarters Stock",
        "No Stock"
      ],
      [
        "Granulated Grip Tape",
        "Stippled Grip Tape",
        "Rubberized Grip Tape"
      ],
      [
        "50 Round Mags",
        "60 Round Mags"
      ],
      [
        "Commando Foregrip",
        "Merc Foregrip",
        "Tactical Foregrip",
        "Ranger Foregrip",
        "Operator Foregrip"
      ],
      [
        "Frangible - Disabling",
        "Fast Melee",
        "Recon",
        "FMJ",
        "Frangible - Wounding",
        "Mo' Money",
        "Fully Loaded",
        "Sleight of Hand",
        "Heavy Hitter"
      ]
    ]
  },
  {
    name: 'Striker 45',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/a/ae/Striker_45_model_MW.png/revision/latest/scale-to-width-down/350?cb=20200426112818',
    attachments: [
      [
        "Flash Guard",
        "Tactical Suppressor",
        "Muzzle Brake",
        "Breacher Device",
        "Lightweight Suppressor",
        "Compensator",
        "Monolithic Suppressor"
      ],
      [
        "300mm Poly Barrel",
        "400mm Stainless Steel",
        "150mm Stainless Steel"
      ],
      [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      [
        "Aim-Op Reflex Sight",
        "Corp Combat Holo Sight",
        "Operator Reflex Sight",
        "Cronen LP945 Mini Reflex",
        "VLK 3.0x Optic",
        "APX5 Holographic Sight",
        "G.I. Mini Reflex",
        "Scout Combat Optic",
        "Monocle Reflex Sight",
        "4.0 Flip Hybrid",
        "Solozero NVG Enhanced",
        "Viper Reflex Sight",
        "PBX Holo 7 Sight",
        "Integral Hybrid",
        "Solozero Optics Mini Reflex",
        "Merc Thermal Optic",
        "Canted Hybrid",
        "Cronen C480 Pro Optic",
        "Thermal Hybrid"
      ],
      [
        "FSS Guardian",
        "FTAC Precision Fixed Stock",
        "XRK Gen III Survivalist Series"
      ],
      [
        "FTAC 60 Series Polymer",
        "FTAC G-5 EXO",
        "FTAC 60 Series Rubber"
      ],
      [
        ".45 Hollow Point 12-R Mags",
        "45 Round Mags"
      ],
      [
        "Commando Foregrip",
        "Merc Foregrip",
        "Tactical Foregrip",
        "Ranger Foregrip",
        "Operator Foregrip"
      ],
      [
        "Frangible - Disabling",
        "Fast Melee",
        "Recon",
        "FMJ",
        "Frangible - Wounding",
        "Mo' Money",
        "Fully Loaded",
        "Sleight of Hand",
        "Heavy Hitter"
      ]
    ]
  },
  {
    name: 'Fennec',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/8/89/Fennec_Gunsmith_Preview_MW.png/revision/latest/scale-to-width-down/350?cb=20200725015115',
    attachments: [
      [
        "Flash Guard",
        "Muzzle Brake",
        "CQB Breacher Device",
        "Tactical Suppressor",
        "Monolithic Suppressor",
        "ZLR Sabre",
        "Compensator"
      ],
      [
        "ZLR 16\" Apex",
        "ZLR 18\" Deadfall"
      ],
      [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      [
        "Cronen LP945 Mini Reflex",
        "Operator Reflex Sight",
        "Corp Combat Holo Sight",
        "Viper Reflex Sight",
        "Solozero Optics Mini Reflex",
        "Scout Combat Optic",
        "APX5 Holographic Sight",
        "Integral Hybrid",
        "G.I. Mini Reflex",
        "Monocle Reflex Sight",
        "VLK 3.0x Optic",
        "Solozero NVG Enhanced",
        "Canted Hybrid",
        "Aim-Op Reflex Sight",
        "PBX Holo 7 Sight",
        "Merc Thermal Optic",
        "Thermal Hybrid",
        "Cronen C480 Pro Optic"
      ],
      [
        "FTAC C6 Carbine PRO",
        "FORGE TAC CQS",
        "ZLR Blade",
        "No Stock"
      ],
      [
        "Granulated Grip Tape",
        "Stippled Grip Tape",
        "Rubberized Grip Tape"
      ],
      [
        "40 Round Drum Mags",
        ".45 Hollow Point 12-R Mags"
      ],
      [
        "Merc Foregrip",
        "Commando Foregrip",
        "Operator Foregrip",
        "Tactical Foregrip",
        "Ranger Foregrip"
      ],
      [
        "Heavy Hitter",
        "Frangible - Wounding",
        "Recon",
        "FMJ",
        "Fully Loaded",
        "Frangible - Disabling",
        "Mo' Money",
        "Sleight of Hand",
        "Fast Melee"
      ]
    ]
  },
  {
    name: 'Model 680',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/6/64/Model_680_menu_icon_MW.png/revision/latest/scale-to-width-down/349?cb=20190922183606',
    attachments: [
      [
        "Breacher Device",
        "Flash Guard",
        "Monolithic Suppressor",
        "Muzzle Brake",
        "Compensator",
        "Choke",
        "FORGE TAC Marauder",
        "Tactical Suppressor",
        "Oil Can Suppressor (Campaign only)",
        "Colossus Suppressor (Campaign only)[citation needed]"
      ],
      [
        "XRK 18.0\" Liberator",
        "XRK 14.0\" SWAT",
        "XRK 30.0\" Sport"
      ],
      [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      [
        "Operator Reflex Sight",
        "Corp Combat Holo Sight",
        "Aim-Op Reflex Sight",
        "Cronen LP945 Mini Reflex",
        "APX5 Holographic Sight",
        "Scout Combat Optic",
        "Viper Reflex Sight",
        "VLK 3.0x Optic",
        "G.I. Mini Reflex",
        "Solozero NVG Enhanced",
        "PBX Holo 7 Sight",
        "Monocle Reflex Sight",
        "Cronen C480 Pro Optic",
        "Solozero Optics Mini Reflex"
      ],
      [
        "FTAC Stalker-12",
        "FORGE TAC Ultralight",
        "No Stock",
        "Lockwood Precision Series",
        "FTAC Hunter"
      ],
      [
        "Tube Extension",
        "Slug Rounds",
        "12 Gauge 6-R Mags",
        "Slug 6-R Mags",
        "Dragon's Breath Rounds",
        "Dragon's Breath 6-R Mags"
      ],
      [
        "Commando Foregrip",
        "Merc Foregrip",
        "Tactical Foregrip",
        "Lockwood Precision Series",
        "Operator Foregrip",
        "XRK Truegrip Tactical"
      ],
      [
        "Frangible - Wounding",
        "Heavy Hitter",
        "FMJ",
        "Sleight of Hand",
        "Recon",
        "Fully Loaded",
        "Mo' Money",
        "Fast Melee"
      ]
    ]
  },
  {
    name: 'R9-0',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/d/d7/R9-0_Gunsmith_Preview_MW.png/revision/latest/scale-to-width-down/350?cb=20200418103658',
    attachments: [
      [
        "Flash Guard",
        "Breacher Device",
        "Tactical Suppressor",
        "Muzzle Brake",
        "Compensator",
        "Choke",
        "Lightweight Suppressor",
        "Monolithic Suppressor"
      ],
      [
        "FORGE TAC Sentry",
        "FORGE TAC Gemini"
      ],
      [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      [
        "Operator Reflex Sight",
        "Corp Combat Holo Sight",
        "Aim-Op Reflex Sight",
        "Cronen LP945 Mini Reflex",
        "APX5 Holographic Sight",
        "VLK 3.0x Optic",
        "Viper Reflex Sight",
        "Scout Combat Optic",
        "PBX Holo 7 Sight",
        "G.I. Mini Reflex",
        "Monocle Reflex Sight",
        "Solozero NVG Enhanced",
        "Solozero Optics Mini Reflex",
        "Cronen C480 Pro Optic"
      ],
      [
        "FSS R9-0 Bulldog",
        "FTAC Ultralight Pump",
        "FTAC Close Quarters Pro"
      ],
      [
        "Granulated Grip Tape",
        "Rubberized Grip Tape",
        "Stippled Grip Tape"
      ],
      [
        "Tube Extensions",
        "Slug Rounds",
        "Dragon's Breath Rounds (campaign only)"
      ],
      [
        "Merc Foregrip",
        "Ranger Foregrip",
        "Operator Foregrip"
      ],
      [
        "Sleight of Hand",
        "FMJ",
        "Frangible - Wounding",
        "Heavy Hitter",
        "Frangible - Disabling",
        "Fully Loaded",
        "Mo' Money",
        "Recon",
        "Fast Melee"
      ]
    ]
  },
  {
    name: '725',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/4/4a/725_menu_icon_MW.png/revision/latest/scale-to-width-down/350?cb=20200417230105',
    attachments: [
      [
        "Breacher Device",
        "Flash Guard",
        "Lightweight Suppressor",
        "Muzzle Brake",
        "Compensator",
        "Monolithic Suppressor",
        "Choke",
        "Tactical Suppressor"
      ],
      [
        "Tempus Smooth Bore",
        "Sawed-off Barrel",
        "Tempus 32\" Competition"
      ],
      [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      [
        "Aim-Op Reflex Sight",
        "APX5 Holographic Sight",
        "Cronen LP945 Mini Reflex",
        "Operator Reflex Sight",
        "Scout Combat Optic",
        "Corp Combat Holo Sight",
        "Viper Reflex Sight",
        "Cronen C480 Pro Optic",
        "PBX Holo 7 Sight",
        "G.I. Mini Reflex",
        "VLK 3.0x Optic",
        "Solozero NVG Enhanced",
        "Monocle Reflex Sight",
        "Brownlee 32mm Scope",
        "Solozero Optics Mini Reflex"
      ],
      [
        "Cronen Equilibrium",
        "Cronen Pro Light",
        "Sawed-off Stock",
        "Tempus Sport"
      ],
      [
        "Tempus SlimGrip",
        "FORGE TAC Steady Grip",
        "FORGE TAC Commander"
      ],
      [
        "Slug Rounds"
      ],
      [
        "Commando Foregrip",
        "Merc Foregrip",
        "Tactical Foregrip",
        "Ranger Foregrip",
        "Operator Foregrip"
      ],
      [
        "Heavy Hitter",
        "FMJ",
        "Fully Loaded",
        "Mo' Money",
        "Sleight of Hand",
        "Frangible - Wounding",
        "Fast Melee",
        "Recon",
        "Frangible - Disabling"
      ]
    ]
  },
  {
    name: 'Origin 12',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/3/36/Origin_12_Shotgun_Gunsmith_Preview_MW.png/revision/latest/scale-to-width-down/350?cb=20191119014350',
    attachments: [
      [
        "Breacher Device",
        "Flash Guard",
        "Tactical Suppressor",
        "Muzzle Brake",
        "Compensator",
        "Choke",
        "Lightweight Suppressor",
        "Monolithic Suppressor"
      ],
      [
        "FORGE TAC Precision",
        "FORGE TAC Wideshot",
        "FORGE TAC Impaler"
      ],
      [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      [
        "Solozero Optics Mini Reflex",
        "Corp Combat Holo Sight",
        "Aim-Op Reflex Sight",
        "Cronen LP945 Mini Reflex",
        "Operator Reflex Sight",
        "Scout Combat Optic",
        "PBX Holo 7 Sight",
        "VLK 3.0x Optic",
        "Viper Reflex Sight",
        "APX5 Holographic Sight",
        "G.I. Mini Reflex",
        "Cronen C480 Pro Optic",
        "Monocle Reflex Sight",
        "Solozero NVG Enhanced"
      ],
      [
        "FTAC Hunter",
        "FORGE TAC Ultralight",
        "No Stock",
        "FORGE TAC Dart"
      ],
      [
        "Granulated Grip Tape",
        "Rubberized Grip Tape",
        "Stippled Grip Tape"
      ],
      [
        "12 Round Mags",
        "8 Round Slug Mags",
        "25 Round Drum Mags"
      ],
      [
        "Merc Foregrip",
        "Commando Foregrip"
      ],
      [
        "Frangible - Disabling",
        "FMJ",
        "Frangible - Wounding",
        "Recon",
        "Fast Melee",
        "Heavy Hitter",
        "Sleight of Hand",
        "Mo' Money",
        "Fully Loaded"
      ]
    ]
  },
  {
    name: 'VLK Rogue',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/6/63/VLK_Rouge_Gunsmith_Preview_MW.png/revision/latest/scale-to-width-down/350?cb=20200725015200',
    attachments: [
      [
        "Breacher Device",
        "Flash Guard",
        "Tactical Suppressor",
        "Muzzle Brake",
        "Compensator",
        "Choke",
        "FORGE TAC Marauder",
        "Monolithic Suppressor"
      ],
      [
        "VLK Czar",
        "6\" Revolt",
        "16\" Warlord"
      ],
      [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      [
        "Solozero Optics Mini Reflex",
        "Corp Combat Holo Sight",
        "Aim-Op Reflex Sight",
        "Cronen LP945 Mini Reflex",
        "Operator Reflex Sight",
        "Scout Combat Optic",
        "PBX Holo 7 Sight",
        "VLK 3.0x Optic",
        "Viper Reflex Sight",
        "APX5 Holographic Sight",
        "G.I. Mini Reflex",
        "Cronen C480 Pro Optic",
        "Monocle Reflex Sight",
        "Solozero NVG Enhanced"
      ],
      [
        "FTAC Hunter",
        "FORGE TAC Ultralight",
        "No Stock",
        "FSS Close Quarters Stock"
      ],
      [
        "Granulated Grip Tape",
        "Rubberized Grip Tape",
        "Stippled Grip Tape"
      ],
      [
        "12 Round Mags",
        "8 Round Slug Mags",
        "4 Round Mags",
        "Dragon's Breath Rounds"
      ],
      [
        "XRK Race Grip",
        "VLK Prime Pump Grip",
        "XRK ReliaGrip"
      ],
      [
        "Frangible - Disabling",
        "FMJ",
        "Frangible - Wounding",
        "Recon",
        "Fast Melee",
        "Heavy Hitter",
        "Sleight of Hand",
        "Mo' Money",
        "Fully Loaded"
      ]
    ]
  },
  {
    name: "PKM",
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/4/4a/PKM_Gunsmith_Preview_MW.png/revision/latest/scale-to-width-down/350?cb=20191118195300',
    attachments: [
      [
        "Flash Guard",
        "Monolithic Suppressor",
        "Muzzle Brake",
        "CQB Breacher Device",
        "Lightweight Suppressor",
        "Compensator",
        "Tactical Suppressor"
      ],
      [
        "18.2\" Compact Barrel",
        "26.9\" Extended Barrel",
        "25.9\" Heavy Barrel"
      ],
      [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      [
        "Operator Reflex Sight",
        "Corp Combat Holo Sight",
        "Aim-Op Reflex Sight",
        "VLK 3.0x Optic",
        "Solozero Optics Mini Reflex",
        "PBX Holo 7 Sight",
        "Cronen LP945 Mini Reflex",
        "Integral Hybrid",
        "Solozero NVG Enhanced",
        "Scout Combat Optic",
        "Monocle Reflex Sight",
        "Sniper Scope",
        "APX5 Holographic Sight",
        "G.I. Mini Reflex",
        "Cronen C480 Pro Optic",
        "Merc Thermal Optic",
        "Canted Hybrid",
        "Viper Reflex Sight",
        "Thermal Hybrid"
      ],
      [
        "FORGE TAC Stalker",
        "FORGE TAC Ultralight",
        "FSS Close Quarters Stock",
        "No Stock"
      ],
      [
        "Stippled Grip Tape",
        "Rubberized Grip Tape",
        "Granulated Grip Tape"
      ],
      [
        "150 Round Belt",
        "200 Round Belt"
      ],
      [
        "Commando Foregrip",
        "Merc Foregrip",
        "Tactical Foregrip",
        "Bipod",
        "Snatch Grip",
        "Operator Foregrip"
      ],
      [
        "Heavy Hitter",
        "Recon",
        "Frangible - Wounding",
        "Fast Melee",
        "Mo' Money",
        "Fully Loaded",
        "Sleight of Hand",
        "FMJ",
        "Frangible - Disabling"
      ]
    ]
  },
  {
    name: 'SA87',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/1/1b/SA87_Gunsmith_Preview_MW.png/revision/latest/scale-to-width-down/350?cb=20200418175953',
    attachments: [
      [
        "Flash Guard",
        "Tactical Suppressor",
        "Muzzle Brake",
        "CQB Breacher Device",
        "Lightweight Suppressor",
        "Compensator",
        "Monolithic Suppressor"
      ],
      [
        "SA87 18.2\" Factory",
        "SA87 25.4\" Factory",
        "SA87 12.4\" Factory"
      ],
      [
        "5mW Laser",
        "1mW Laser",
        "Tac Laser"
      ],
      [
        "G.I. Mini Reflex",
        "Corp Combat Holo Sight",
        "Operator Reflex Sight",
        "Viper Reflex Sight",
        "Scout Combat Optic",
        "APX5 Holographic Sight",
        "Solozero Optics Mini Reflex",
        "Solozero NVG Enhanced",
        "Integral Hybrid",
        "VLK 3.0x Optic",
        "Aim-Op Reflex Sight",
        "Cronen LP945 Mini Reflex",
        "Sniper Scope",
        "Merc Thermal Optic",
        "PBX Holo 7 Sight",
        "Cronen C480 Pro Optic",
        "Thermal Hybrid",
        "Monocle Reflex Sight",
        "Canted Hybrid"
      ],
      [
        "XRK SA87 Heavy Stock Pro",
        "SA87 Ultralight Hollow",
        "FORGE TAC CQB Comb"
      ],
      [
        "Rubberized Grip Tape",
        "Granulated Grip Tape",
        "Stippled Grip Tape"
      ],
      [
        "50 Round Mags",
        "60 Round Mags"
      ],
      [
        "Commando Foregrip",
        "Merc Foregrip",
        "Tactical Foregrip",
        "Operator Foregrip",
        "Bipod",
        "Ranger Foregrip"
      ],
      [
        "Heavy Hitter",
        "Recon",
        "Frangible - Disabling",
        "Sleight of Hand",
        "Mo' Money",
        "Fast Melee",
        "FMJ",
        "Fully Loaded",
        "Frangible - Wounding"
      ]
    ]
  },
  {
    name: 'M91',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/c/ce/M91_Gusmith_Preview_MW.png/revision/latest/scale-to-width-down/350?cb=20200418175919',
    attachments: [
      [
        "Breacher Device",
        "Flash Guard",
        "Muzzle Brake",
        "Lightweight Suppressor",
        "Tactical Suppressor",
        "Compensator",
        "Monolithic Suppressor"
      ],
      [
        "M91 Special Forces",
        "M91 Infantry",
        "M91 Heavy"
      ],
      [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      [
        "Cronen LP945 Mini Reflex",
        "Corp Combat Holo Sight",
        "Aim-Op Reflex Sight",
        "Viper Reflex Sight",
        "VLK 3.0x Optic",
        "APX5 Holographic Sight",
        "Operator Reflex Sight",
        "Solozero NVG Enhanced",
        "Integral Hybrid",
        "Scout Combat Optic",
        "Solozero Optics Mini Reflex",
        "Sniper Scope",
        "4.0 Flip Hybrid",
        "Merc Thermal Optic",
        "G.I. Mini Reflex",
        "PBX Holo 7 Sight",
        "Canted Hybrid",
        "Monocle Reflex Sight",
        "Cronen C480 Pro Optic",
        "Thermal Hybrid"
      ],
      [
        "FORGE TAC Stalker",
        "FORGE TAC Ultralight",
        "No Stock",
        "XRK Striker"
      ],
      [
        "Granulated Grip Tape",
        "Stippled Grip Tape",
        "Rubberized Grip Tape"
      ],
      [
        "120 Round Belt",
        "150 Round HEI Belt"
      ],
      [
        "Commando Foregrip",
        "Merc Foregrip",
        "Bipod",
        "Tactical Foregrip",
        "Ranger Foregrip",
        "Operator Foregrip"
      ],
      [
        "Heavy Hitter",
        "Recon",
        "FMJ",
        "Sleight of Hand",
        "Frangible - Wounding",
        "Fast Melee",
        "Fully Loaded",
        "Mo' Money",
        "Frangible - Disabling"
      ]
    ]
  },
  {
    name: 'MG34',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/6/6b/MG34_Gunsmith_Preview_MW.png/revision/latest/scale-to-width-down/350?cb=20191119013209',
    attachments: [
      [
        "CQB Breacher Device",
        "Flash Guard",
        "Muzzle Brake",
        "Lightweight Suppressor",
        "Tactical Suppressor",
        "Compensator",
        "Monolithic Suppressor"
      ],
      [
        "FSS Brute",
        "FSS Stubby",
        "FSS Elite"
      ],
      [
        "Tac Laser",
        "5mW Laser",
        "1mW Laser"
      ],
      [
        "Operator Reflex Sight",
        "Corp Combat Holo Sight",
        "Aim-Op Reflex Sight",
        "G.I. Mini Reflex",
        "Scout Combat Optic",
        "APX5 Holographic Sight",
        "Cronen LP945 Mini Reflex",
        "Integral Hybrid",
        "Solozero NVG Enhanced",
        "VLK 3.0x Optic",
        "Viper Reflex Sight",
        "Merc Thermal Optic",
        "Thermal Hybrid",
        "Cronen C480 Pro Optic",
        "Monocle Reflex Sight",
        "Canted Hybrid",
        "PBX Holo 7 Sight",
        "Solozero Optics Mini Reflex",
        "Sniper Scope"
      ],
      [
        "FORGE TAC Stalker",
        "FORGE TAC Ultralight",
        "No Stock",
        "FSS Close Quarters Stock"
      ],
      [
        "Stippled Grip Tape",
        "Granulated Grip Tape",
        "Rubberized Grip Tape"
      ],
      [
        "75 Round Belt",
        "100 Round Belt"
      ],
      [
        "Merc Foregrip",
        "Bipod",
        "Commando Foregrip",
        "Tactical Foregrip",
        "Operator Foregrip",
        "Ranger Foregrip"
      ],
      [
        "Heavy Hitter",
        "Recon",
        "Fast Melee",
        "Frangible - Disabling",
        "FMJ",
        "Sleight of Hand",
        "Mo' Money",
        "Fully Loaded",
        "Frangible - Wounding"
      ]
    ]
  },
  {
    name: 'Holger-26',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/5/56/Holger-26_model_MW.png/revision/latest/scale-to-width-down/349?cb=20200125023033',
    attachments: [
      [
        "Breacher Device",
        "Flash Guard",
        "Muzzle Brake",
        "Lightweight Suppressor",
        "Tactical Suppressor",
        "Compensator",
        "Monolithic Suppressor"
      ],
      [
        "XRK Ultralight",
        "FTAC 8.98\" Spitfire"
      ],
      [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      [
        "Cronen LP945 Mini Reflex",
        "Corp Combat Holo Sight",
        "Aim-Op Reflex Sight",
        "Viper Reflex Sight",
        "VLK 3.0x Optic",
        "APX5 Holographic Sight",
        "Operator Reflex Sight",
        "Solozero NVG Enhanced",
        "Integral Hybrid",
        "Scout Combat Optic",
        "Solozero Optics Mini Reflex",
        "FSS Integral Reflex",
        "Sniper Scope",
        "4.0 Flip Hybrid",
        "Merc Thermal Optic",
        "G.I. Mini Reflex",
        "PBX Holo 7 Sight",
        "Canted Hybrid",
        "Monocle Reflex Sight",
        "Cronen C480 Pro Optic​",
        "Thermal Hybrid",
        "Solozero K498 4.0x Integral"
      ],
      [
        "FSS Ranger",
        "FSS Infantry",
        "No Stock",
        "XRK Axis"
      ],
      [
        "Granulated Grip Tape",
        "Stippled Grip Tape",
        "Rubberized Grip Tape"
      ],
      [
        "30 Round Mags"
      ],
      [
        "Commando Foregrip",
        "Merc Foregrip",
        "Tactical Foregrip",
        "Ranger Foregrip",
        "Operator Foregrip"
      ],
      [
        "Heavy Hitter",
        "Recon",
        "FMJ",
        "Sleight of Hand",
        "Frangible - Wounding",
        "Fast Melee",
        "Fully Loaded",
        "Mo' Money",
        "Frangible - Disabling"
      ]
    ]
  },
  {
    name: 'Bruen Mk9',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/0/02/Bruen_MK9_icon_menu_MW_2019.png/revision/latest/scale-to-width-down/350?cb=20200514104038',
    attachments: [
      [
        "Flash Guard",
        "Breacher Device",
        "Muzzle Brake",
        "Lightweight Suppressor",
        "Tactical Suppressor",
        "Compensator",
        "Monolithic Suppressor"
      ],
      [
        "XRK Horizon 23.0\"",
        "XRK Summit 26.8\"",
        "Bruen 18.0\" Para"
      ],
      [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      [
        "G.I. Mini Reflex",
        "Corp Combat Holo Sight",
        "Aim-Op Reflex Sight",
        "Viper Reflex Sight",
        "VLK 3.0x Optic",
        "APX5 Holographic Sight",
        "Operator Reflex Sight",
        "Solozero NVG Enhanced",
        "Integral Hybrid",
        "Scout Combat Optic",
        "Solozero Optics Mini Reflex",
        "Sniper Scope",
        "4.0 Flip Hybrid",
        "Merc Thermal Optic",
        "Cronen LP945 Mini Reflex",
        "PBX Holo 7 Sight",
        "Canted Hybrid",
        "Monocle Reflex Sight",
        "Cronen C480 Pro Optic",
        "Thermal Hybrid"
      ],
      [
        "FORGE TAC Stalker",
        "FORGE TAC Ultralight",
        "FSS Close Quarters Stock",
        "No Stock",
        "Skeleton Stock"
      ],
      [
        "Granulated Grip Tape",
        "Stippled Grip Tape",
        "Rubberized Grip Tape"
      ],
      [
        "200 Round Belt",
        "60 Round Mags"
      ],
      [
        "Commando Foregrip",
        "Merc Foregrip",
        "Bipod",
        "Tactical Foregrip",
        "Ranger Foregrip",
        "Operator Foregrip"
      ],
      [
        "Heavy Hitter",
        "Recon",
        "FMJ",
        "Sleight of Hand",
        "Frangible - Wounding",
        "Fast Melee",
        "Mo' Money",
        "Fully Loaded",
        "Frangible - Disabling"
      ]
    ]
  },
  {
    name: 'EBR-14',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/7/7f/EBR-14_Gunsmith_Preview_MW.png/revision/latest/scale-to-width-down/350?cb=20191119180948',
    attachments: [
      [
        "Flash Guard",
        "Tactical Suppressor",
        "Breacher Device",
        "Muzzle Brake",
        "Compensator",
        "Lightweight Suppressor",
        "Monolithic Suppressor"
      ],
      [
        "FORGE TAC Precision 20.0\"",
        "FORGE TAC Elite",
        "FORGE TAC Precision 22.0\""
      ],
      [
        "Tac Laser"
      ],
      [
        "Operator Reflex Sight",
        "Corp Combat Holo Sight",
        "Aim-Op Reflex Sight",
        "Scout Combat Optic",
        "APX5 Holographic Sight",
        "Integral Hybrid",
        "G.I. Mini Reflex",
        "VLK 3.0x Optic",
        "PBX Holo 7 Sight",
        "Solozero NVG Enhanced",
        "Sniper Scope",
        "4.0 Flip Hybrid",
        "Viper Reflex Sight",
        "Canted Hybrid",
        "Monocle Reflex Sight",
        "Variable Zoom Scope",
        "Cronen C480 Pro Optic",
        "Merc Thermal Optic",
        "Thermal Hybrid"
      ],
      [
        "FTAC Precision Comb",
        "FSS Raider Chassis Pro",
        "FTAC Lightweight Stock",
        "FSS Raider Chassis Elite"
      ],
      [
        "15 Round Mags",
        "20 Round Mags"
      ],
      [
        "Commando Foregrip",
        "Tactical Foregrip",
        "Bipod",
        "Merc Foregrip",
        "Ranger Foregrip",
        "Operator Foregrip"
      ],
      [
        "Heavy Hitter",
        "FMJ",
        "Fast Melee",
        "Sleight of Hand",
        "Frangible - Wounding",
        "Fully Loaded",
        "Mo' Money",
        "Presence of Mind",
        "Recon",
        "Focus",
        "Frangible - Disabling"
      ]
    ]
  },
  {
    name: 'MK2 Carbine',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/6/6f/MK2_Carbine_Gunsmith_Preview_MW.png.png/revision/latest/scale-to-width-down/350?cb=20200418175733',
    attachments: [
      [
        "Flash Guard",
        "Tactical Suppressor",
        "Muzzle Brake",
        "Compensator",
        "Lightweight Suppressor",
        "Breacher Device",
        "Monolithic Suppressor"
      ],
      [
        "FSS 18.0\" Factory",
        "FSS 20.0\" Factory",
        "FSS 24.0\" Factory"
      ],
      [
        "Tac Laser"
      ],
      [
        "Cronen LP945 Mini Reflex",
        "Corp Combat Holo Sight",
        "Viper Reflex Sight",
        "PBX Holo 7 Sight",
        "Cronen C480 Pro Optic",
        "Solozero Optics Mini Reflex",
        "Operator Reflex Sight",
        "VLK 3.0x Optic",
        "Solozero NVG Enhanced",
        "Sniper Scope",
        "4.0 Flip Hybrid",
        "G.I. Mini Reflex",
        "Aim-Op Reflex Sight",
        "APX5 Holographic Sight",
        "Monocle Reflex Sight",
        "Thermal Hybrid",
        "Scout Combat Optic",
        "Merc Thermal Optic",
        "Integral Hybrid",
        "Variable Zoom Scope"
      ],
      [
        "Cartridge Sleeve",
        "FSS MK2 Sport Comb",
        "FSS MK2 Precision Comb",
        "MK2 Ultralight Hollow"
      ],
      [
        "Rubberized Grip Tape",
        "Stippled Grip Tape",
        "Granulated Grip Tape"
      ],
      [
        "Heavy Hitter",
        "FMJ",
        "Sleight of Hand",
        "Frangible - Wounding",
        "Fully Loaded",
        "Focus",
        "Presence of Mind",
        "Mo' Money",
        "Fast Melee",
        "Recon",
        "Frangible - Disabling"
      ]
    ]
  },
  {
    name: 'Kar98k',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/f/fb/Kar98k_Preview_MW.PNG.png/revision/latest/scale-to-width-down/350?cb=20200418175806',
    attachments: [
      [
        "Flash Guard",
        "Breacher Device",
        "Muzzle Brake",
        "Tactical Suppressor",
        "Monolithic Suppressor",
        "Compensator",
        "Lightweight Suppressor"
      ],
      [
        "Singuard Custom 25.1\"",
        "Singuard Custom 21.2\"",
        "Singuard Custom 27.6\""
      ],
      [
        "Tac Laser"
      ],
      [
        "Cronen LP945 Mini Reflex",
        "Aim-Op Reflex Sight",
        "Corp Combat Holo Sight",
        "Scout Combat Optic",
        "APX5 Holographic Sight",
        "Operator Reflex Sight",
        "4.0 Flip Hybrid",
        "Sniper Scope",
        "Integral Hybrid",
        "Solozero NVG Enhanced",
        "VLK 3.0x Optic",
        "PBX Holo 7 Sight",
        "G.I. Mini Reflex",
        "Viper Reflex Sight",
        "Cronen C480 Pro Optic",
        "Solozero Optics Mini Reflex",
        "Monocle Reflex Sight",
        "Merc Thermal Optic",
        "Thermal Hybrid",
        "Variable Zoom Scope"
      ],
      [
        "STVOL Precision Comb",
        "Hollow Stock Mod",
        "FTAC Sport Comb"
      ],
      [
        "Stippled Grip Tape",
        "Granulated Grip Tape",
        "Rubberized Grip Tape"
      ],
      [
        "Bipod"
      ],
      [
        "Heavy Hitter",
        "FMJ",
        "Sleight of Hand",
        "Frangible - Wounding",
        "Fully Loaded",
        "Presence of Mind",
        "Mo' Money",
        "Focus",
        "Fast Melee",
        "Recon",
        "Frangible - Disabling"
      ]
    ]
  },
  {
    name: 'Crossbow',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/5/55/Crossbow_model_MW.png/revision/latest/scale-to-width-down/350?cb=20200426112336',
    attachments: [
      [
        "16-Strand Cable",
        "28-Strand Cable"
      ],
      [
        "XRK Thunder 200 Lb",
        "XRK Quill 100 Lb",
        "XRK Carbon Elite"
      ],
      [
        "Tac Laser"
      ],
      [
        "Cronen LP945 Mini Reflex",
        "Aim-Op Reflex Sight",
        "Corp Combat Holo Sight",
        "Scout Combat Optic",
        "APX5 Holographic Sight",
        "Operator Reflex Sight",
        "XRK MidTrak 4.0x Scope",
        "Solozero NVG Enhanced",
        "VLK 3.0x Optic",
        "PBX Holo 7 Sight",
        "G.I. Mini Reflex",
        "Viper Reflex Sight",
        "Cronen C480 Pro Optic",
        "Solozero Optics Mini Reflex",
        "Monocle Reflex Sight",
        "Merc Thermal Optic",
        "XRK Rangemaster VZ"
      ],
      [
        "FORGE TAC Apex",
        "FORGE TAC Dart CB",
        "FORGE TAC SpeedTrak"
      ],
      [
        "FTAC Fury 20\" Bolts",
        "FTAC Venom 20\" Bolts",
        "FTAC Backburn 20\" Bolts"
      ],
      [
        "FTAC Speed Grip",
        "XRK Precision Grip",
        "XRK Talon"
      ],
      [
        "Heavy Hitter",
        "Sleight of Hand",
        "Frangible - Wounding",
        "Fully Loaded",
        "Presence of Mind",
        "Mo' Money",
        "Focus",
        "Fast Melee",
        "Recon",
        "Frangible - Disabling"
      ]
    ]
  },
  {
    name: 'SKS',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/2/22/SKS_Gunsmith_Preview_MW.png/revision/latest/scale-to-width-down/350?cb=20200725015150',
    attachments: [
      [
        "Flash Guard",
        "Tactical Suppressor",
        "Breacher Device",
        "Muzzle Brake",
        "Compensator",
        "Lightweight Suppressor",
        "Monolithic Suppressor"
      ],
      [
        "FTAC Landmark",
        "16\" FSS Para",
        "22\" FSS M59/66"
      ],
      [
        "Tac Laser"
      ],
      [
        "Operator Reflex Sight",
        "Corp Combat Holo Sight",
        "Aim-Op Reflex Sight",
        "Scout Combat Optic",
        "APX5 Holographic Sight",
        "Integral Hybrid",
        "G.I. Mini Reflex",
        "VLK 3.0x Optic",
        "PBX Holo 7 Sight",
        "Solozero NVG Enhanced",
        "PU Scope",
        "4.0 Flip Hybrid",
        "Viper Reflex Sight",
        "Canted Hybrid",
        "Monocle Reflex Sight",
        "Variable Zoom Scope",
        "Cronen C480 Pro Optic",
        "Merc Thermal Optic",
        "Thermal Hybrid"
      ],
      [
        "SKS Rifle Stock",
        "FTAC Hunter-Scout",
        "Sawed-off Stock"
      ],
      [
        "30 Round Mags",
        "10 Round Mags"
      ],
      [
        "Commando Foregrip",
        "Tactical Foregrip",
        "Bipod",
        "Merc Foregrip",
        "Ranger Foregrip",
        "Operator Foregrip"
      ],
      [
        "Heavy Hitter",
        "FMJ",
        "Fast Melee",
        "Sleight of Hand",
        "Frangible - Wounding",
        "Fully Loaded",
        "Mo' Money",
        "Presence of Mind",
        "Recon",
        "Focus",
        "Frangible - Disabling"
      ]
    ]
  },
  {
    name: 'Dragunov',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/7/76/Dragunov_Gunsmith_Preview_MW.png/revision/latest/scale-to-width-down/350?cb=20191118200732',
    attachments: [
      [
        "Flash Guard",
        "Monolithic Suppressor",
        "Breacher Device",
        "Muzzle Brake",
        "Tactical Suppressor",
        "Compensator",
        "Lightweight Suppressor"
      ],
      [
        "510mm Compact Barrel",
        "660mm Extended Barrel"
      ],
      [
        "Tac Laser"
      ],
      [
        "Scout Combat Optic",
        "Thermal Sniper Scope",
        "VLK 3.0x Optic",
        "Variable Zoom Scope",
        "Thermal Dual Power Scope",
        "Cronen C480 Pro Optic",
        "Merc Thermal Optic"
      ],
      [
        "FTAC Hunter-Scout",
        "Skeleton Stock",
        "VLK Lightweight Stock",
        "FTAC Stalker-Scout"
      ],
      [
        "15 Round Mags",
        "20 Round Mags"
      ],
      [
        "Bipod"
      ],
      [
        "Heavy Hitter",
        "Recon",
        "Sleight of Hand",
        "Fully Loaded",
        "Frangible - Wounding",
        "Presence of Mind",
        "Mo' Money",
        "Fast Melee",
        "FMJ",
        "Focus",
        "Frangible - Disabling"
      ]
    ]
  },
  {
    name: 'HDR',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/4/4b/HDR_Gunsmith_Preview_MW.png/revision/latest/scale-to-width-down/349?cb=20191122025017',
    attachments: [
      [
        "Flash Guard",
        "Tactical Suppressor",
        "Breacher Device",
        "Muzzle Brake",
        "Lightweight Suppressor",
        "Compensator",
        "Monolithic Suppressor"
      ],
      [
        "26.9\" HDR Pro",
        "26.0\" Bull Barrel",
        "17.2\" Bull Barrel"
      ],
      [
        "Tac Laser"
      ],
      [
        "Scout Combat Optic",
        "Thermal Sniper Scope",
        "VLK 3.0x Optic",
        "Variable Zoom Scope",
        "Cronen C480 Pro Optic",
        "Merc Thermal Optic",
        "Thermal Dual Power Scope"
      ],
      [
        "FTAC Stalker-Scout",
        "FTAC Hunter-Scout",
        "FSS Nomad Stock",
        "FTAC Champion"
      ],
      [
        "7 Round Mags",
        "9 Round Mags"
      ],
      [
        "Bipod"
      ],
      [
        "Heavy Hitter",
        "FMJ",
        "Recon",
        "Sleight of Hand",
        "Frangible - Disabling",
        "Fully Loaded",
        "Focus",
        "Presence of Mind",
        "Mo' Money",
        "Fast Melee",
        "Frangible - Wounding"
      ]
    ]
  },
  {
    name: 'AX-50',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/4/4c/AX-50_Gunsmith_Preview_MW.png/revision/latest/scale-to-width-down/350?cb=20191119183608',
    attachments: [
      [
        "Flash Guard",
        "Lightweight Suppressor",
        "Breacher Device",
        "Muzzle Brake",
        "Monolithic Suppressor",
        "Compensator",
        "Tactical Suppressor"
      ],
      [
        "Singuard Arms Pro",
        "17.0\" Factory Barrel",
        "32.0\" Factory Barrel"
      ],
      [
        "Tac Laser"
      ],
      [
        "Scout Combat Optic",
        "VLK 3.0x Optic",
        "Thermal Sniper Scope",
        "Variable Zoom Scope",
        "Cronen C480 Pro Optic",
        "Merc Thermal Optic",
        "Thermal Dual Power Scope"
      ],
      [
        "Singuard Arms Marksman (Lv.12)",
        "Singuard Arms Evader",
        "Singuard Arms Assassin"
      ],
      [
        "Rubberized Grip Tape",
        "Granulated Grip Tape",
        "Stippled Grip Tape"
      ],
      [
        "7 Round Mags",
        "9 Round Mags"
      ],
      [
        "Bipod"
      ],
      [
        "Heavy Hitter",
        "Sleight of Hand",
        "Fast Melee",
        "Recon",
        "Presence of Mind",
        "Focus",
        "Mo' Money",
        "Frangible - Wounding",
        "FMJ",
        "Fully Loaded",
        "Frangible - Disabling"
      ]
    ]
  },
  {
    name: 'Rytec AMR',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/e/e4/Rytec_AMR_Gunsmith_Preview_MW.png/revision/latest/scale-to-width-down/350?cb=20200725015141',
    attachments: [
      [
        "XRK Tank Brake",
        "Rytec AMR Suppressor"
      ],
      [
        "FTAC Seven Straight",
        "FTAC 448mm Dictator",
        "XRK Harbinger"
      ],
      [
        "Tac Laser"
      ],
      [
        "Scout Combat Optic",
        "VLK 3.0x Optic",
        "Thermal Sniper Scope",
        "Cronen C480 Pro Optic",
        "Variable Zoom Scope",
        "Merc Thermal Optic",
        "Thermal Dual Power Scope"
      ],
      [
        "XRK Mastadon",
        "FTAC Trekker",
        "STOVL Tac-Wrap"
      ],
      [
        "Rubberized Grip Tape",
        "Granulated Grip Tape",
        "Stippled Grip Tape"
      ],
      [
        "25×59mm Explosive 5-R mag",
        "25×59mm Thermite 5-R mag"
      ],
      [
        "Bipod"
      ],
      [
        "Mo' Money",
        "Sleight of Hand",
        "Fast Melee",
        "Recon",
        "Presence of Mind",
        "FMJ",
        "Heavy Hitter",
        "Frangible - Wounding",
        "Focus",
        "Frangible - Disabling",
        "Fully Loaded"
      ]
    ]
  },
  {
    name: 'Riot Shield',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/0/06/Riot_Shield_Gunsmith_Preview_MW.png/revision/latest/scale-to-width-down/350?cb=20191119182146',
    attachments: []
  }
];

export const secondaryGuns: GunInfo[] = [
  {
    name: 'X16',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/6/63/X16_Gunsmith_Preview_MW.png/revision/latest/scale-to-width-down/350?cb=20200417215813',
    attachments: [
      [
        "Flash Guard",
        "Monolithic Suppressor",
        "Muzzle Brake",
        "Oil Can Suppressor",
        "Compensator",
        "Lightweight Suppressor",
        "Tactical Suppressor"
      ],
      [
        "Singuard Arms Featherweight",
        "Vanguard Elite",
        "Singuard Arms Advantage"
      ],
      [
        "1mW Laser",
        "Tac Laser",
        "5mW Laser"
      ],
      [
        "Solozero Optics Mini Reflex",
        "G.I. Mini Reflex",
        "Cronen LP945 Mini Reflex"
      ],
      [
        "Granulated Grip Tape",
        "Stippled Grip Tape",
        "X16 Stock",
        "Rubberized Grip Tape"
      ],
      [
        "17 Round Mags",
        "26 Round Mags"
      ],
      [
        "Lightweight Trigger",
        "Heavy Duty Trigger",
        "Match Grade Trigger"
      ],
      [
        "Fast Melee",
        "Frangible - Wounding",
        "Frangible - Disabling",
        "FMJ",
        "Mo' Money",
        "Sleight of Hand",
        "Recon",
        "Heavy Hitter",
        "Fully Loaded",
        "Akimbo"
      ]
    ]
  },
  {
    name: '1911',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/8/86/1911_Gunsmith_Preview_MW.PNG/revision/latest/scale-to-width-down/350?cb=20200417215830',
    attachments: [
      [
        "Flash Guard",
        "Oil Can Suppressor",
        "Muzzle Brake",
        "Tactical Suppressor",
        "Compensator",
        "Monolithic Suppressor",
        "Lightweight Suppressor"
      ],
      [
        ".45 Compact",
        ".45 Match Grade",
        "1911 Stalker"
      ],
      [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      [
        "Cronen LP945 Mini Reflex",
        "Solozero Optics Mini Reflex",
        "G.I. Mini Reflex"
      ],
      [
        "Rubberized Grip Tape",
        "Stippled Grip Tape",
        "Granulated Grip Tape"
      ],
      [
        "10 Round Mags",
        "15 Round Mags"
      ],
      [
        "Lightweight Trigger",
        "Heavy Duty Trigger",
        "Match Grade Trigger"
      ],
      [
        "Fast Melee",
        "Frangible - Disabling",
        "Recon",
        "Fully Loaded",
        "FMJ",
        "Frangible - Wounding",
        "Mo' Money",
        "Sleight of Hand",
        "Heavy Hitter",
        "Akimbo"
      ]
    ]
  },
  {
    name: '.357',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/1/19/.357_Gunsmith_Preview_MW.PNG/revision/latest/scale-to-width-down/350?cb=20200417215851',
    attachments: [
      [
        "Flash Guard",
        "Muzzle Brake",
        "Compensator"
      ],
      [
        ".357 Snub Nose",
        "Silverfield Ordnance .357",
        ".357 Long"
      ],
      [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      [
        "Operator Reflex Sight",
        "Aim-Op Reflex Sight",
        "Corp Combat Holo Sight",
        "G.I. Mini Reflex",
        "Solozero Optics Mini Reflex",
        "Scout Combat Optic",
        "APX5 Holographic Sight",
        "Viper Reflex Sight",
        "VLK 2.5x Optic",
        "Cronen LP945 Mini Reflex",
        "Monocle Reflex Sight",
        "Cronen C480 Pro Optic",
        "Lockwood Pistol Scope"
      ],
      [
        "Granulated Grip Tape",
        "Lockwood .357 Custom Stock",
        "Stippled Grip Tape",
        "FSS Raider Stock",
        "Rubberized Grip Tape"
      ],
      [
        "Snake Shot"
      ],
      [
        "Lightweight Trigger",
        "Heavy Duty Trigger",
        "Match Grade Trigger"
      ],
      [
        "Fast Melee",
        "Frangible - Disabling",
        "Fully Loaded",
        "Sleight of Hand",
        "Frangible - Wounding",
        "Mo' Money",
        "Recon",
        "Heavy Hitter",
        "FMJ",
        "Akimbo"
      ]
    ]
  },
  {
    name: 'M19',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/7/7f/M19_Gunsmith_Preview_MW.PNG/revision/latest/scale-to-width-down/350?cb=20200417215953',
    attachments: [
      [
        "Muzzle Brake",
        "Flash Guard",
        "Monolithic Suppressor",
        "Lightweight Suppressor",
        "Compensator",
        "Oil Can Suppressor",
        "Tactical Suppressor"
      ],
      [
        "XRK L Super",
        "XRK V Extended",
        "A9-16 Lightweight"
      ],
      [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      [
        "Cronen LP945 Mini Reflex",
        "Solozero Optics Mini Reflex",
        "G.I. Mini Reflex"
      ],
      [
        "Granulated Grip Tape",
        "Rubberized Grip Tape",
        "Stippled Grip Tape"
      ],
      [
        "21 Round Mags",
        "32 Round Mags"
      ],
      [
        "Lightweight Trigger",
        "Heavy Duty Trigger",
        "Match Grade Trigger"
      ],
      [
        "Fast Melee",
        "Frangible - Wounding",
        "Fully Loaded",
        "FMJ",
        "Mo' Money",
        "Heavy Hitter",
        "Sleight of Hand",
        "Recon",
        "Frangible - Disabling",
        "Akimbo"
      ]
    ]
  }, 
  {
    name: '.50 GS',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/e/e3/.50_GS_menu_icon_MW.png/revision/latest/scale-to-width-down/350?cb=20200417220016',
    attachments: [
      [
        "Flash Guard",
        "Muzzle Brake",
        "Monolithic Suppressor",
        "Oil Can Suppressor",
        "Compensator",
        "Lightweight Suppressor",
        "Tactical Suppressor"
      ],
      [
        "FORGE TAC Extended",
        "FORGE TAC Enforcer"
      ],
      [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      [
        "Operator Reflex Sight",
        "Cronen LP945 Mini Reflex",
        "Corp Combat Holo Sight",
        "Aim-Op Reflex Sight",
        "Solozero Optics Mini Reflex",
        "APX5 Holographic Sight",
        "Viper Reflex Sight",
        "Scout Combat Optic",
        "G.I. Mini Reflex",
        "VLK 2.5x Optic",
        "Monocle Reflex Sight",
        "Cronen C480 Pro Optic"
      ],
      [
        "Granulated Grip Tape",
        "Stippled Grip Tape",
        "Rubberized Grip Tape"
      ],
      [
        "10 Round Mags",
        "13 Round Mags"
      ],
      [
        "Lightweight Trigger",
        "Heavy Duty Trigger",
        "Match Grade Trigger"
      ],
      [
        "Fast Melee",
        "Frangible - Disabling",
        "Fully Loaded",
        "Sleight of Hand",
        "Frangible - Wounding",
        "Mo' Money",
        "Recon",
        "Heavy Hitter",
        "FMJ",
        "Akimbo"
      ]
    ]
  },
  {
    name: 'Renetti',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/a/ab/Renetti_model_MW.png/revision/latest/scale-to-width-down/350?cb=20200504133740',
    attachments: [
      [
        "Flash Guard",
        "Oil Can Suppressor",
        "Muzzle Brake",
        "Tactical Suppressor",
        "Desperado Pro Compensator",
        "Monolithic Suppressor",
        "Lightweight Suppressor"
      ],
      [
        "Mk1 Competition",
        "Mk1 Extended",
        "Mk3 Burst Mod"
      ],
      [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      [
        "Cronen LP945 Mini Reflex",
        "Operator Reflex Sight",
        "Corp Combat Holo Sight",
        "Solozero Optics Mini Reflex",
        "Aim-Op Reflex Sight",
        "Scout Combat Optic",
        "APX5 Holographic Sight",
        "Monocle Reflex Sight",
        "VLK 2.5x Optic",
        "G.I. Mini Reflex",
        "XRK 4.0x Pistol Scope",
        "Viper Reflex Sight",
        "Cronen C480 Pro Optic"
      ],
      [
        "FTAC SATUS CS-3",
        "FTAC G-X",
        "FTAC SATUS CS-X"
      ],
      [
        "XRK Pro Grip",
        "XRK Speed Grip"
      ],
      [
        "21 Round Mags",
        "27 Round Mags"
      ],
      [
        "Lightweight Trigger",
        "Heavy Duty Trigger",
        "Match Grade Trigger"
      ],
      [
        "Fast Melee",
        "Frangible - Disabling",
        "Recon",
        "Fully Loaded",
        "FMJ",
        "Frangible - Wounding",
        "Mo' Money",
        "Sleight of Hand",
        "Heavy Hitter",
        "Akimbo"
      ]
    ]
  },
  {
    name: 'PILA',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/3/3a/PILA_model_MW.png/revision/latest/scale-to-width-down/350?cb=20200418180441',
    attachments: []
  },
  {
    name: 'Strela-P',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/d/d2/Strela-P_model_MW.png/revision/latest/scale-to-width-down/350?cb=20200125023729',
    attachments: []
  },
  {
    name: 'JOKR',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/e/ea/JOKR_model_MW.png/revision/latest/scale-to-width-down/350?cb=20200125023810',
    attachments: []
  },
  {
    name: 'RPG-7',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/2/23/RPG-7_Gunsmith_Preview_MW.png/revision/latest/scale-to-width-down/350?cb=20191119042041',
    attachments: []
  },
  {
    name: 'Combat Knife',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/1/13/Combat_Knife_model_MW.png/revision/latest/scale-to-width-down/350?cb=20200125023856',
    attachments: []
  },
  {
    name: 'Kali Sticks',
    image: '',
    attachments: []
  }
]

export function randomPrimaryClass() {
  const maxAttachments = 5;
  const randomGun = Object.assign({}, primaryGuns[Math.floor(Math.random() * primaryGuns.length)]) as GunInfo;
  while (randomGun.attachments.length > maxAttachments ) {
    randomGun.attachments.slice(Math.floor(Math.random() * randomGun.attachments.length));
  }
  for(let i = 0; i < randomGun.attachments.length; i++) {
    while(randomGun.attachments[i].length > 1) {
      randomGun.attachments[i].slice(Math.floor(Math.random() * randomGun.attachments[i].length));
    }
  }
  return randomGun;
}

export function randomSecondaryClass() {
  const maxAttachments = 5;
  const randomGun = Object.assign({}, secondaryGuns[Math.floor(Math.random() * secondaryGuns.length)]) as GunInfo;
  while (randomGun.attachments.length > maxAttachments ) {
    randomGun.attachments.slice(Math.floor(Math.random() * randomGun.attachments.length));
  }
  for(let i = 0; i < randomGun.attachments.length; i++) {
    while(randomGun.attachments[i].length > 1) {
      randomGun.attachments[i].slice(Math.floor(Math.random() * randomGun.attachments[i].length));
    }
  }
  return randomGun;
}