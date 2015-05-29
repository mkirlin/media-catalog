# Ruby program that parses folders to create csv of media on your machine
require 'pry'
require 'CSV'

puts "Enter file to scan (include full path from here):"
@path = gets.chomp

@clean_files = []
@clean_path = @path.gsub(/\\/, '')
files = Dir.glob(@path + "*")

files.each do |file|
	@clean_files << file.gsub(/#{@clean_path}/, "").split('.')
end

def save_file
	puts "What would you like your generated list file to be named? (single string, no file extension)"
	save_title = gets.chomp
	puts "File will be saved in current directory as " + save_title + ".csv"
	puts "Is that correct? y/n"
	confirm = gets.chomp
	if confirm == "y"
		save_location = save_title + ".csv"
		# TODO: make this fucking thing warn you if there's another file with the same name
		system "touch #{save_location}"
		CSV.open(save_location, 'w') do |csv|
			@clean_files.each do |file|
				csv << file
			end
		end
	else
		save_file
	end
end

save_file
