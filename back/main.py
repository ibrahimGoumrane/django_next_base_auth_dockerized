def check_poppler_installation():
    import os
    import subprocess
    from pdf2image import convert_from_path
    import tempfile
    from reportlab.pdfgen import canvas  # For creating a valid test PDF
    
    print("Checking Poppler installation...")
    
    # 1. Check specified path - I see you have it as "poppeler" (with an extra 'e')
    poppler_path = r'C:\ProgramData\poppeler\poppler-23.11.0\Library\bin'
    print(f"Checking path: {poppler_path}")
    
    if not os.path.exists(poppler_path):
        print(f"❌ ERROR: Path doesn't exist: {poppler_path}")
        return False
    
    # 2. Check for key executables - this part passed in your output
    key_executables = ['pdfinfo.exe', 'pdftoppm.exe', 'pdftotext.exe']
    all_found = True
    for exe in key_executables:
        exe_path = os.path.join(poppler_path, exe)
        if os.path.exists(exe_path):
            print(f"✅ Found: {exe}")
        else:
            print(f"❌ Missing: {exe}")
            all_found = False
    
    if not all_found:
        print("Some executables are missing.")
        return False
    
    # 3. Test conversion with a VALID PDF
    print("\nTesting PDF conversion...")
    try:
        # Create a valid test PDF (not just an empty file)
        tmp_path = os.path.join(tempfile.gettempdir(), 'test_poppler.pdf')
        c = canvas.Canvas(tmp_path)
        c.drawString(100, 750, "This is a test PDF for Poppler")
        c.save()
        
        print(f"Created test PDF at: {tmp_path}")
        
        # Try to convert using explicit path
        try:
            print(f"Testing with explicit poppler_path: {poppler_path}")
            images = convert_from_path(tmp_path, first_page=1, last_page=1, poppler_path=poppler_path)
            print(f"✅ Success! Converted PDF to {len(images)} image(s)")
            print(f"\n👉 USE THIS PATH in your code: poppler_path=r'{poppler_path}'")
            
            # Show example code
            print("\nExample code to use in your project:")
            print("```python")
            print(f"from pdf2image import convert_from_path")
            print(f"poppler_path = r'{poppler_path}'")
            print(f"images = convert_from_path('your_file.pdf', poppler_path=poppler_path)")
            print("```")
            
            return True
        except Exception as e:
            print(f"❌ Failed with explicit path: {str(e)}")
            print("\n🔧 TROUBLESHOOTING NEEDED:")
            print("1. The Poppler executables were found but conversion failed")
            print("2. Try reinstalling with: choco install poppler")
            print("3. Try adding the bin directory to your PATH and restarting your terminal")
            return False
    
    except Exception as e:
        print(f"Error during testing: {str(e)}")
        return False
    
    finally:
        # Clean up
        if os.path.exists(tmp_path):
            try:
                os.unlink(tmp_path)
            except:
                pass

def check_pytesseract_installation():
    import pytesseract
    print(pytesseract.get_tesseract_version())
# Run the check
if __name__ == "__main__":
    check_poppler_installation()
    # check_pytesseract_installation()