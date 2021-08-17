all:
	rm -r io.vito.PawExtensions.ruby-vcr
	mkdir io.vito.PawExtensions.ruby-vcr
	cp LICENSE README.md ruby-vcr.js io.vito.PawExtensions.ruby-vcr
	zip -r io.vito.PawExtensions.ruby-vcr.zip io.vito.PawExtensions.ruby-vcr
