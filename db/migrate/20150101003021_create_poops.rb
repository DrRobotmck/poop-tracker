class CreatePoops < ActiveRecord::Migration
  def change
    create_table :poops do |t|
      t.boolean :pooped, default: true
      t.belongs_to :user
      t.timestamps
    end
  end
end
