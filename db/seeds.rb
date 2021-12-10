# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require "faker"

Appointment.destroy_all
Doctor.destroy_all
Patient.destroy_all

d1 = Doctor.create(name: "Dr. " + Faker::Name.name)
d2 = Doctor.create(name: "Dr. " + Faker::Name.name)
d3 = Doctor.create(name: "Dr. " + Faker::Name.name)
d4 = Doctor.create(name: "Dr. " + Faker::Name.name)
d5 = Doctor.create(name: "Dr. " + Faker::Name.name)

docs =[d1,d2,d3,d4,d5]

5.times do
    patient = Patient.create(name: Faker::Name.name)
    3.times do 
        doc = docs.sample
        Appointment.create(doctor_id: doc.id, patient_id: patient.id, date: Faker::Time.between(from: DateTime.now - 10, to: DateTime.now, format: :long))
    end
end

puts "doctors: #{Doctor.all.length}"
puts "patients: #{Patient.all.length}"
puts "appointments: #{Appointment.all.length}"