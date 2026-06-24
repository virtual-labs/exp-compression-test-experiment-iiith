### What is Measured?

During the compression test, the following quantities are measured:

- Applied compressive load, $P$
- Original specimen diameter, $d$
- Original specimen length, $L$
- Change in length, $\Delta L$

These measurements are used to determine the compressive properties of the material.

### Why are the Calculations Required?

The measured quantities alone do not fully describe the behaviour of a material under compression.

The calculations help determine:

- Compressive stress
- Compressive strain
- Young's Modulus
- Yield strength
- Compressive strength

These properties are required for engineering analysis and design.

### Observation Table

Assume a cylindrical specimen having:

- Diameter = 20 mm
- Original length = 40 mm

| Load (kN) | Reduction in Length (mm) |
| --------- | ------------------------ |
| 0         | 0.000                    |
| 20        | 0.020                    |
| 40        | 0.040                    |
| 60        | 0.065                    |
| 80        | 0.095                    |
| 100       | 0.140                    |
| 120       | 0.220                    |
| 140       | 0.350                    |
| 160       | 0.550                    |

### Sequential Calculations

#### 1. Cross-Sectional Area

$$
A=\frac{\pi d^2}{4}
$$

For a specimen diameter of 20 mm,

$$
A=\frac{\pi(20)^2}{4}
$$

$$
A=314.16\ mm^2
$$

#### 2. Compressive Stress

$$
\sigma_c=\frac{P}{A}
$$

#### 3. Compressive Strain

$$
\epsilon_c=\frac{\Delta L}{L}
$$

#### 4. Young's Modulus

$$
E=\frac{\sigma_c}{\epsilon_c}
$$

#### 5. Compressive Strength

Compressive strength is the maximum compressive stress sustained by the specimen.

$$
\sigma_{comp}=\frac{P_{max}}{A}
$$

where:

- $P_{max}$ = Maximum load carried by the specimen

### Solved Numerical Example

Given:

- Diameter = 20 mm
- Original length = 40 mm
- Applied load = 80 kN
- Reduction in length = 0.095 mm

#### Step 1: Area

$$
A=\frac{\pi(20)^2}{4}
$$

$$
A=314.16\ mm^2
$$

#### Step 2: Compressive Stress

$$
\sigma_c=\frac{80000}{314.16}
$$

$$
\sigma_c=254.6\ N/mm^2
$$

#### Step 3: Compressive Strain

$$
\epsilon_c=\frac{0.095}{40}
$$

$$
\epsilon_c=0.002375
$$

#### Step 4: Young's Modulus

$$
E=\frac{254.6}{0.002375}
$$

$$
E=107200\ N/mm^2
$$

$$
E=107.2\ GPa
$$

### Interpretation of Results

- A linear stress-strain relationship indicates elastic behaviour.
- Increasing compressive stress causes shortening of the specimen.
- Ductile materials exhibit significant deformation before failure.
- Brittle materials fail by cracking or crushing.
- Higher compressive strength indicates greater resistance to crushing.

### Result

The compression test was performed successfully, and the compressive properties of the material were determined from the load-deformation behaviour.
