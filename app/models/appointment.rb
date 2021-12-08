class Appointment < ApplicationRecord
  belongs_to :doctor
  belongs_to :patient

  def self.all_and_more
    appointments = Appointment.all
    appointments.map do |app|
      {id: app.id, date: app.date, patient_name: app.patient.name, doctor_name: app.doctor.name, patient_id: app.patient.id, doctor_id: app.doctor.id }
    end
  end
end
