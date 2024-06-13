import React, { useState } from "react";
import axios from "axios";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    education: "",
    institution: "",
    graduationYear: "",
  });

  const [errors, setErrors] = useState({});

  const nextStep = () => {
 
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await axios.post("http://localhost:8080/users", formData);
        alert("User Created Successfully");
      } catch (error) {
        console.error("Error creating user:", error);
        alert("Failed to create user.");
      }
    }
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return validatePersonalDetails();
      case 2:
        return validateAddressDetails();
      case 3:
        return validateEducationDetails();
      default:
        return true;
    }
  };

  const validatePersonalDetails = () => {
    let valid = true;
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required";
      valid = false;
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      valid = false;
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const validateAddressDetails = () => {
    let valid = true;
    const errors = {};

    if (!formData.address.trim()) {
      errors.address = "Address is required";
      valid = false;
    }

    if (!formData.city.trim()) {
      errors.city = "City is required";
      valid = false;
    }

    if (!formData.state.trim()) {
      errors.state = "State is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const validateEducationDetails = () => {
    let valid = true;
    const errors = {};

    if (!formData.education.trim()) {
      errors.education = "Education details are required";
      valid = false;
    }

    if (!formData.institution.trim()) {
      errors.institution = "Institution name is required";
      valid = false;
    }

    if (!formData.graduationYear) {
      errors.graduationYear = "Graduation year is required";
      valid = false;
    } else if (isNaN(formData.graduationYear) || formData.graduationYear < 1900 || formData.graduationYear > new Date().getFullYear()) {
      errors.graduationYear = "Please enter a valid graduation year";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const validateForm = () => {
    const validPersonalDetails = validatePersonalDetails();
    const validAddressDetails = validateAddressDetails();
    const validEducationDetails = validateEducationDetails();

    return validPersonalDetails && validAddressDetails && validEducationDetails;
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className="p-4">
      {step === 1 && (
        <div>
          <h2 className="text-2xl mb-2">Step 1: Personal Details</h2>
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          {errors.firstName && <p className="text-red-500 mb-2">{errors.firstName}</p>}
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          {errors.lastName && <p className="text-red-500 mb-2">{errors.lastName}</p>}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          {errors.email && <p className="text-red-500 mb-2">{errors.email}</p>}
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl mb-2">Step 2: Address Details</h2>
          <input
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          {errors.address && <p className="text-red-500 mb-2">{errors.address}</p>}
          <input
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) =>
              setFormData({ ...formData, city: e.target.value })
            }
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          {errors.city && <p className="text-red-500 mb-2">{errors.city}</p>}
          <input
            type="text"
            placeholder="State"
            value={formData.state}
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          {errors.state && <p className="text-red-500 mb-2">{errors.state}</p>}
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-2xl mb-2">Step 3: Education Details</h2>
          <input
            type="text"
            placeholder="Education"
            value={formData.education}
            onChange={(e) =>
              setFormData({ ...formData, education: e.target.value })
            }
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          {errors.education && <p className="text-red-500 mb-2">{errors.education}</p>}
          <input
            type="text"
            placeholder="Institution"
            value={formData.institution}
            onChange={(e) =>
              setFormData({ ...formData, institution: e.target.value })
            }
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          {errors.institution && <p className="text-red-500 mb-2">{errors.institution}</p>}
          <input
            type="number"
            placeholder="Graduation Year"
            value={formData.graduationYear}
            onChange={(e) =>
              setFormData({ ...formData, graduationYear: e.target.value })
            }
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          {errors.graduationYear && <p className="text-red-500 mb-2">{errors.graduationYear}</p>}
        </div>
      )}

      <div className="flex justify-between">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Back
          </button>
        )}
        {step < 3 ? (
          <button onClick={nextStep} className="bg-blue-500 text-white p-2 rounded">
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} className="bg-green-500 text-white p-2 rounded">
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
