# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :poop, :class => 'Poops' do
    pooped false
  end
end
